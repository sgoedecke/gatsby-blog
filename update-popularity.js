const fs = require("fs")
const https = require("https")
const path = require("path")
const matter = require("gray-matter")
const fg = require("fast-glob")

const HN_POINT_WEIGHT = 1
const HN_COMMENT_WEIGHT = 2
const LOBSTERS_POINT_WEIGHT = 3
const LOBSTERS_COMMENT_WEIGHT = 5

const STALE_AFTER_MS = 30 * 24 * 60 * 60 * 1000

const dryRun = process.argv.includes("--dry-run")

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
            reject(new Error(`GET ${url} returned invalid JSON: ${error.message}`))
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

const discussionParagraphs = content =>
  content
    .split(/\n\s*\n/)
    .filter(paragraph => {
      const lower = paragraph.toLowerCase()

      if (/^\s*\[\^/.test(paragraph)) {
        return false
      }

      if (
        !lower.includes("news.ycombinator.com/item?id=") &&
        !lower.includes("lobste.rs/s/")
      ) {
        return false
      }

      return (
        /^\s*(edit|update|\*\*update:\*\*)\b/i.test(paragraph) ||
        /this (post|article) (was|got|also got|made)/i.test(paragraph) ||
        /got (some|lots of|quite a few|a bunch of|many) comments/i.test(
          paragraph
        ) ||
        /was discussed/i.test(paragraph) ||
        /posted on/i.test(paragraph) ||
        /made it to/i.test(paragraph) ||
        /attention on/i.test(paragraph) ||
        /traction on/i.test(paragraph) ||
        /check out.*discussion/i.test(paragraph) ||
        /there (are|is).*comments (about|on) this post/i.test(paragraph) ||
        /some interesting discussion of this post/i.test(paragraph)
      )
    })

const extractHnIds = paragraphs => {
  const ids = new Set()
  const pattern = /news\.ycombinator\.com\/item\?id=(\d+)/g

  for (const paragraph of paragraphs) {
    for (const match of paragraph.matchAll(pattern)) {
      ids.add(match[1])
    }
  }

  return [...ids]
}

const extractLobstersIds = paragraphs => {
  const ids = new Set()
  const pattern = /lobste\.rs\/s\/([a-z0-9]+)/gi

  for (const paragraph of paragraphs) {
    for (const match of paragraph.matchAll(pattern)) {
      ids.add(match[1])
    }
  }

  return [...ids]
}

const normalizePath = pathname => {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`
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

const fetchHnMetrics = async (ids, slug) => {
  const stories = []

  for (const id of ids) {
    const item = await requestJson(
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

const fetchLobstersMetrics = async (ids, slug) => {
  const stories = []

  for (const id of ids) {
    const story = await requestJson(`https://lobste.rs/s/${id}.json`)

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
    score: Math.round(score),
    hackerNews: {
      points: hnPoints,
      comments: hnComments,
      threads: hnStories.length,
    },
    lobsters: {
      points: lobstersPoints,
      comments: lobstersComments,
      threads: lobstersStories.length,
    },
    manual,
  }
}

const removePopularityBlock = frontmatter => {
  const lines = frontmatter.split("\n")
  const nextLines = []

  for (let index = 0; index < lines.length; index++) {
    if (!/^popularity:\s*$/.test(lines[index])) {
      nextLines.push(lines[index])
      continue
    }

    index++
    while (index < lines.length && /^(\s+|$)/.test(lines[index])) {
      index++
    }
    index--
  }

  return nextLines.join("\n")
}

const popularityBlock = popularity =>
  [
    "popularity:",
    `  score: ${popularity.score}`,
    "  hackerNews:",
    `    points: ${popularity.hackerNews.points}`,
    `    comments: ${popularity.hackerNews.comments}`,
    `    threads: ${popularity.hackerNews.threads}`,
    "  lobsters:",
    `    points: ${popularity.lobsters.points}`,
    `    comments: ${popularity.lobsters.comments}`,
    `    threads: ${popularity.lobsters.threads}`,
    `  manual: ${popularity.manual}`,
  ].join("\n")

const writePopularity = (raw, popularity) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)

  if (!match) {
    throw new Error("missing frontmatter")
  }

  const originalFrontmatter = match[1]
  const body = raw.slice(match[0].length)
  const frontmatter = removePopularityBlock(originalFrontmatter)
  const lines = frontmatter.split("\n")
  let insertAfter = lines.findIndex(line => /^popular:\s/.test(line))

  if (insertAfter === -1) {
    insertAfter = lines.findIndex(line => /^date:\s/.test(line))
  }

  if (insertAfter === -1) {
    insertAfter = lines.length - 1
  }

  lines.splice(insertAfter + 1, 0, popularityBlock(popularity))

  return `---\n${lines.join("\n")}\n---\n\n${body.replace(/^\n+/, "")}`
}

const main = async () => {
  const updates = []
  const rankings = []

  const now = Date.now()

  for (const file of fg.sync("content/blog/**/index.md").sort()) {
    const raw = fs.readFileSync(file, "utf8")
    const parsed = matter(raw)

    if (parsed.data.popularity && parsed.data.date) {
      const postDate = new Date(parsed.data.date).getTime()
      if (Number.isFinite(postDate) && now - postDate > STALE_AFTER_MS) {
        rankings.push({
          file,
          title: parsed.data.title,
          popularity: parsed.data.popularity,
          stale: true,
        })
        continue
      }
    }

    const paragraphs = discussionParagraphs(parsed.content)
    const hnIds = extractHnIds(paragraphs)
    const lobstersIds = extractLobstersIds(paragraphs)

    if (hnIds.length === 0 && lobstersIds.length === 0) {
      continue
    }

    const slug = `/${path.basename(path.dirname(file))}/`
    const hnStories = await fetchHnMetrics(hnIds, slug)
    const lobstersStories = await fetchLobstersMetrics(lobstersIds, slug)

    if (hnStories.length === 0 && lobstersStories.length === 0) {
      continue
    }

    const popularity = buildPopularity(
      parsed.data.popularity,
      hnStories,
      lobstersStories
    )
    const update = {
      file,
      title: parsed.data.title,
      popularity,
      nextRaw: writePopularity(raw, popularity),
    }
    updates.push(update)
    rankings.push({ ...update, stale: false })
  }

  if (!dryRun) {
    updates.forEach(update => {
      fs.writeFileSync(update.file, update.nextRaw)
    })
  }

  rankings
    .sort((a, b) => (b.popularity.score || 0) - (a.popularity.score || 0))
    .forEach(entry => {
      const hn = entry.popularity.hackerNews || {}
      const lobsters = entry.popularity.lobsters || {}

      console.log(
        [
          entry.popularity.score || 0,
          `HN ${hn.points || 0}/${hn.comments || 0}/${hn.threads || 0}`,
          `Lobsters ${lobsters.points || 0}/${lobsters.comments || 0}/${lobsters.threads || 0}`,
          entry.stale ? "stale" : "fresh",
          path.dirname(entry.file),
          entry.title,
        ].join("\t")
      )
    })
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
