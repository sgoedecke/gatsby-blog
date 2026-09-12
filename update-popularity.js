const fs = require("fs")
const https = require("https")
const path = require("path")
const matter = require("gray-matter")
const fg = require("fast-glob")
const { backfillDiscussionUrls } = require("./src/utils/discussion-links")

const HN_POINT_WEIGHT = 1
const HN_COMMENT_WEIGHT = 2
const LOBSTERS_POINT_WEIGHT = 3
const LOBSTERS_COMMENT_WEIGHT = 5

const STALE_AFTER_MS = 60 * 24 * 60 * 60 * 1000 // 60 days

const requestJson = url =>
  new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          "User-Agent": "seangoedecke.com popularity updater",
        },
      },
      response => {
        let body = ""

        response.on("data", chunk => {
          body += chunk
        })

        response.on("end", () => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(new Error(`GET ${url} returned ${response.statusCode}`))
            return
          }

          try {
            resolve(JSON.parse(body))
          } catch (error) {
            reject(
              new Error(`GET ${url} returned invalid JSON: ${error.message}`)
            )
          }
        })
      }
    )

    request.setTimeout(10000, () => {
      request.destroy(new Error(`GET ${url} timed out`))
    })

    request.on("error", error => {
      reject(error)
    })
  })

const extractHnIds = urls => [
  ...new Set(urls.map(url => new URL(url).searchParams.get("id"))),
]

const extractLobstersIds = urls => [
  ...new Set(urls.map(url => new URL(url).pathname.split("/")[2])),
]

const normalizePath = pathname => {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`
}

const isThisBlogPost = (url, slug) => {
  if (!url) {
    return false
  }

  try {
    const parsed = new URL(url)

    return (
      parsed.hostname.replace(/^www\./, "") === "seangoedecke.com" &&
      normalizePath(parsed.pathname) === slug
    )
  } catch {
    return false
  }
}

const fetchHnMetrics = async (ids, slug, fetchJson) => {
  const stories = []

  for (const id of ids) {
    const item = await fetchJson(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    )

    if (!item || item.type !== "story" || !isThisBlogPost(item.url, slug)) {
      continue
    }

    stories.push({
      id,
      points: item.score || 0,
      comments: item.descendants || 0,
    })
  }

  return stories
}

const fetchLobstersMetrics = async (ids, slug, fetchJson) => {
  const stories = []

  for (const id of ids) {
    const story = await fetchJson(`https://lobste.rs/s/${id}.json`)

    if (!story || !story.short_id || !isThisBlogPost(story.url, slug)) {
      continue
    }

    stories.push({
      id,
      points: story.score || 0,
      comments: story.comment_count || 0,
    })
  }

  return stories
}

const sum = (items, key) => items.reduce((total, item) => total + item[key], 0)

const buildPopularity = (currentPopularity, hnStories, lobstersStories) => {
  const manual = Number(currentPopularity?.manual || 0)
  const hnPoints = sum(hnStories, "points")
  const hnComments = sum(hnStories, "comments")
  const lobstersPoints = sum(lobstersStories, "points")
  const lobstersComments = sum(lobstersStories, "comments")
  const score =
    hnPoints * HN_POINT_WEIGHT +
    hnComments * HN_COMMENT_WEIGHT +
    lobstersPoints * LOBSTERS_POINT_WEIGHT +
    lobstersComments * LOBSTERS_COMMENT_WEIGHT +
    manual

  return {
    ...currentPopularity,
    score: Math.round(score),
    hackerNews: {
      ...currentPopularity.hackerNews,
      urls: currentPopularity.hackerNews?.urls || [],
      points: hnPoints,
      comments: hnComments,
      threads: hnStories.length,
    },
    lobsters: {
      ...currentPopularity.lobsters,
      urls: currentPopularity.lobsters?.urls || [],
      points: lobstersPoints,
      comments: lobstersComments,
      threads: lobstersStories.length,
    },
    manual,
  }
}

const popularityBlock = popularity =>
  matter.stringify("", { popularity }).match(/^---\n([\s\S]*?)\n---/)[1]

const writePopularity = (raw, popularity, markPopular) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)

  if (!match) {
    throw new Error("missing frontmatter")
  }

  const lines = match[1].split("\n")
  if (markPopular) {
    const popularIndex = lines.findIndex(line => /^popular:\s/.test(line))
    if (popularIndex !== -1) {
      lines[popularIndex] = "popular: true"
    } else {
      const dateIndex = lines.findIndex(line => /^date:\s/.test(line))
      lines.splice(
        dateIndex === -1 ? lines.length : dateIndex + 1,
        0,
        "popular: true"
      )
    }
  }

  const start = lines.findIndex(line => /^popularity:\s*$/.test(line))
  if (start !== -1) {
    let end = start + 1
    while (end < lines.length && /^(\s+|$)/.test(lines[end])) {
      end++
    }
    lines.splice(start, end - start, popularityBlock(popularity))
  } else {
    const dateIndex = lines.findIndex(line => /^date:\s/.test(line))
    lines.splice(
      dateIndex === -1 ? lines.length : dateIndex + 1,
      0,
      popularityBlock(popularity)
    )
  }

  return `---\n${lines.join("\n")}\n---${raw.slice(match[0].length)}`
}

const updatePost = async (
  raw,
  slug,
  { backfillUrls = false, now = Date.now(), fetchJson = requestJson } = {}
) => {
  const parsed = matter(raw)
  let popularity = backfillDiscussionUrls(
    parsed.data.popularity,
    parsed.content
  )
  const postDate = new Date(parsed.data.date).getTime()
  const stale = Boolean(
    parsed.data.popularity?.score !== undefined &&
      Number.isFinite(postDate) &&
      now - postDate > STALE_AFTER_MS
  )
  let metricsUpdated = false

  if (!backfillUrls && !stale) {
    const hnIds = extractHnIds(popularity.hackerNews?.urls || [])
    const lobstersIds = extractLobstersIds(popularity.lobsters?.urls || [])
    const hnStories = await fetchHnMetrics(hnIds, slug, fetchJson)
    const lobstersStories = await fetchLobstersMetrics(
      lobstersIds,
      slug,
      fetchJson
    )

    if (hnStories.length > 0 || lobstersStories.length > 0) {
      popularity = buildPopularity(popularity, hnStories, lobstersStories)
      metricsUpdated = true
    }
  }

  const changed =
    Object.keys(popularity).length > 0 &&
    JSON.stringify(popularity) !== JSON.stringify(parsed.data.popularity)

  return {
    title: parsed.data.title,
    popularity,
    stale,
    nextRaw:
      changed || (metricsUpdated && parsed.data.popular !== true)
        ? writePopularity(raw, popularity, metricsUpdated)
        : raw,
  }
}

const main = async () => {
  const dryRun = process.argv.includes("--dry-run")
  const backfillUrls = process.argv.includes("--backfill-urls")
  const updates = []
  const rankings = []

  const now = Date.now()
  const filesIndex = process.argv.indexOf("--files")
  const files =
    filesIndex === -1
      ? fg.sync("content/blog/**/index.md").sort()
      : process.argv.slice(filesIndex + 1)
  if (
    filesIndex !== -1 &&
    (files.length === 0 ||
      files.some(file => !/^content\/blog\/.+\/index\.md$/.test(file)))
  ) {
    throw new Error("--files requires one or more content/blog/**/index.md paths")
  }

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8")
    const slug = `/${path.basename(path.dirname(file))}/`
    const update = {
      file,
      ...(await updatePost(raw, slug, { backfillUrls, now })),
    }
    if (update.nextRaw !== raw) {
      updates.push(update)
    }
    if (Object.keys(update.popularity).length > 0) {
      rankings.push(update)
    }
  }

  if (!dryRun) {
    updates.forEach(update => {
      fs.writeFileSync(update.file, update.nextRaw)
    })
  }

  console.log(
    `${dryRun ? "Would update" : "Updated"} ${updates.length} posts${
      backfillUrls ? " (URLs only)" : ""
    }`
  )

  rankings
    .sort((a, b) => (b.popularity.score || 0) - (a.popularity.score || 0))
    .forEach(entry => {
      const hn = entry.popularity.hackerNews || {}
      const lobsters = entry.popularity.lobsters || {}

      console.log(
        [
          entry.popularity.score || 0,
          `HN ${hn.points || 0}/${hn.comments || 0}/${hn.threads || 0}`,
          `Lobsters ${lobsters.points || 0}/${lobsters.comments || 0}/${
            lobsters.threads || 0
          }`,
          entry.stale ? "stale" : "fresh",
          path.dirname(entry.file),
          entry.title,
        ].join("\t")
      )
    })
}

if (require.main === module) {
  main().catch(error => {
    console.error(error)
    process.exitCode = 1
  })
}

module.exports = { updatePost }
