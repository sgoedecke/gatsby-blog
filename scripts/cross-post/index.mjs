#!/usr/bin/env node
import { execFileSync } from "node:child_process"
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"

import { composeLinkedInCommentary, composeTweet } from "./compose.mjs"
import { linkedInCredentialsFromEnv, postToLinkedIn } from "./linkedin.mjs"
import { capturePost, waitForLive } from "./page.mjs"
import { isSharedEverywhere, loadPosts, pickCandidates } from "./pick.mjs"
import { readCrossPosts, recordCrossPost } from "./record.mjs"
import { postThread, xCredentialsFromEnv } from "./x.mjs"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, "../..")
const siteUrl = (
  process.env.SITE_URL || "https://www.seangoedecke.com"
).replace(/\/$/, "")
const PLATFORMS = ["x", "linkedin"]
const MAX_POSTS_PER_PUSH = 3
const MAX_PICK_ATTEMPTS = 3

const usage = `Usage:
  node index.mjs --slug <slug> [--slug <slug>...] [options]
  node index.mjs --changed <before-sha>..<after-sha> [options]
  node index.mjs --pick-old [--platforms x,linkedin] [--dry-run]

--pick-old shares one older post: the next /popular post not yet on every
platform, or a random unshared post once those run out. Only platforms with
credentials configured count (all of them in a dry run).

Options:
  --dry-run              Capture screenshots and compose text without posting
  --platforms x,linkedin Which platforms to post to (default: both)
  --no-wait              Don't wait for the post URL to go live
  --force                Post even to platforms already recorded in the post's
                         crossPosts frontmatter
  --out <dir>            Where to write previews (default: scripts/cross-post/out)`

function newPostSlugs(range) {
  const [before, after] = range.split("..")
  if (!before || !after || /^0+$/.test(before)) {
    console.log(`No usable commit range (${range}); skipping detection.`)
    return []
  }
  const output = execFileSync(
    "git",
    [
      "-C",
      repoRoot,
      "diff",
      "--no-renames",
      "--name-only",
      "--diff-filter=A",
      before,
      after,
      "--",
      "content/blog",
    ],
    { encoding: "utf8" }
  )
  return output
    .split("\n")
    .map(file => file.match(/^content\/blog\/([^/]+)\/index\.md$/)?.[1])
    .filter(Boolean)
}

function annotate(level, message) {
  if (process.env.GITHUB_ACTIONS) console.log(`::${level}::${message}`)
  else console[level === "error" ? "error" : "warn"](`${level}: ${message}`)
}

function summarize(markdown) {
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`)
  }
}

function warnIfLinkedInTokenExpiring() {
  const expiresAt = Date.parse(process.env.LINKEDIN_TOKEN_EXPIRES_AT || "")
  if (Number.isNaN(expiresAt)) return
  const days = Math.floor((expiresAt - Date.now()) / 86400000)
  if (days <= 14) {
    annotate(
      "warning",
      `LinkedIn access token ${
        days < 0 ? "expired" : `expires in ${days} days`
      }. Run \`npm run linkedin-auth -- --set-secrets\` in scripts/cross-post.`
    )
  }
}

async function crossPost(slug, options) {
  const url = `${siteUrl}/${slug}/`
  console.log(`\n=== ${url}`)

  if (!/^[a-z0-9][a-z0-9-]*$/i.test(slug))
    throw new Error(`Invalid slug: ${slug}`)
  const postFile = path.join(repoRoot, "content/blog", slug, "index.md")
  if (!existsSync(postFile)) throw new Error(`No post at ${postFile}`)

  // Posted URLs are recorded in the post's frontmatter, so reruns and manual
  // runs don't post the same thing twice.
  const alreadyPosted = readCrossPosts(readFileSync(postFile, "utf8"))
  const platforms = options.platforms.filter(platform => {
    if (!alreadyPosted[platform]) return true
    const message = `${slug} was already posted to ${platform}: ${alreadyPosted[platform]}`
    if (options.force) {
      annotate("warning", `${message}. Posting again because of --force.`)
      return true
    }
    console.log(`${message}. Skipping (use --force to post again).`)
    summarize(`- Already posted to ${platform}: ${alreadyPosted[platform]}`)
    return false
  })
  if (!platforms.length && !options.dryRun) return []

  if (options.wait) await waitForLive(url)

  const post = await capturePost(url)
  const tweet = composeTweet({
    paragraphs: post.paragraphs,
    title: post.title,
  })
  const commentary = composeLinkedInCommentary({ paragraphs: post.paragraphs })

  const outDir = path.join(options.out, slug)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, "tweet.txt"), `${tweet}\n`)
  writeFileSync(path.join(outDir, "tweet-reply.txt"), `${url}\n`)
  writeFileSync(path.join(outDir, "linkedin.txt"), `${commentary}\n`)
  post.screenshots.forEach(({ buffer, altText }, index) => {
    writeFileSync(path.join(outDir, `screenshot-${index + 1}.png`), buffer)
    writeFileSync(
      path.join(outDir, `screenshot-${index + 1}-alt.txt`),
      `${altText}\n`
    )
  })
  console.log(
    `Tweet:\n${tweet}\n\nReply:\n${url}\n\nLinkedIn:\n${commentary}\n\nPreviews in ${outDir}`
  )

  const quote = text =>
    text
      .split("\n")
      .map(line => `> ${line}`)
      .join("\n")
  summarize(
    `## ${post.title}\n\n**X:**\n\n${quote(
      tweet
    )}\n\n**X reply:** ${url}\n\n**LinkedIn:**\n\n${quote(commentary)}\n`
  )

  if (options.dryRun) {
    summarize(
      "_Dry run: nothing was posted. Screenshots are in the run's artifacts._\n"
    )
    return []
  }

  const failures = []
  const publish = async (platform, credentials, send) => {
    if (!platforms.includes(platform)) return
    if (!credentials) {
      annotate(
        "warning",
        `Skipping ${platform}: credentials are not configured.`
      )
      return
    }
    const record = link =>
      writeFileSync(
        postFile,
        recordCrossPost(readFileSync(postFile, "utf8"), platform, link)
      )
    try {
      const link = await send(credentials)
      record(link)
      console.log(`Posted to ${platform}: ${link}`)
      summarize(`- Posted to ${platform}: ${link}`)
    } catch (error) {
      if (error.postedUrl) record(error.postedUrl)
      annotate("error", `${slug} → ${platform}: ${error.message}`)
      summarize(`- **Failed** to post to ${platform}: ${error.message}`)
      failures.push(platform)
    }
  }

  await publish("x", xCredentialsFromEnv(), credentials =>
    postThread(credentials, {
      text: tweet,
      images: post.screenshots,
      replyText: url,
    })
  )
  await publish("linkedin", linkedInCredentialsFromEnv(), credentials =>
    postToLinkedIn(credentials, {
      commentary,
      url,
      title: post.title,
      description: post.description,
    })
  )
  return failures
}

async function shareOldPost({ dryRun, force, out, platforms: requested }) {
  // Without this, a platform with no secrets would never get recorded, and
  // the same post would be picked every day.
  const platforms = dryRun
    ? requested
    : requested.filter(platform => {
        const configured = {
          x: xCredentialsFromEnv,
          linkedin: linkedInCredentialsFromEnv,
        }[platform]()
        if (!configured) {
          annotate(
            "warning",
            `Skipping ${platform}: credentials are not configured.`
          )
        }
        return configured
      })
  if (!platforms.length) throw new Error("No platforms to share to.")

  const posts = loadPosts(repoRoot)
  const alreadyShared = new Set(
    posts
      .filter(post => isSharedEverywhere(post, platforms))
      .map(post => post.slug)
  )
  const candidates = pickCandidates(posts, platforms)
  for (const slug of candidates.slice(0, MAX_PICK_ATTEMPTS)) {
    let failed
    try {
      failed = await crossPost(slug, {
        dryRun,
        platforms,
        wait: false,
        // Only true once every post has been shared and we're going around again.
        force: force || alreadyShared.has(slug),
        out,
      })
    } catch (error) {
      // Couldn't capture or compose this post (nothing was posted), so try the
      // next one rather than getting stuck on it every day.
      annotate("warning", `Skipping ${slug}: ${error.message}`)
      continue
    }
    if (failed.length) {
      throw new Error(
        `Failed: ${failed.map(platform => `${slug} → ${platform}`).join(", ")}`
      )
    }
    return
  }
  throw new Error(
    `Couldn't share any of: ${candidates
      .slice(0, MAX_PICK_ATTEMPTS)
      .join(", ")}`
  )
}

async function main() {
  const { values } = parseArgs({
    options: {
      slug: { type: "string", multiple: true, default: [] },
      changed: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      platforms: { type: "string", default: PLATFORMS.join(",") },
      "no-wait": { type: "boolean", default: false },
      force: { type: "boolean", default: false },
      "pick-old": { type: "boolean", default: false },
      out: { type: "string", default: path.join(scriptDir, "out") },
      help: { type: "boolean", default: false },
    },
  })
  const modes = [values.slug.length, values.changed, values["pick-old"]]
  if (values.help || modes.filter(Boolean).length !== 1) {
    console.log(usage)
    process.exit(values.help ? 0 : 1)
  }

  const platforms = values.platforms
    .split(",")
    .map(platform => platform.trim().toLowerCase())
    .filter(Boolean)
  const unknown = platforms.filter(platform => !PLATFORMS.includes(platform))
  if (unknown.length)
    throw new Error(`Unknown platform(s): ${unknown.join(", ")}`)

  if (values["pick-old"]) {
    if (!values["dry-run"] && platforms.includes("linkedin")) {
      warnIfLinkedInTokenExpiring()
    }
    await shareOldPost({
      platforms,
      dryRun: values["dry-run"],
      force: values.force,
      out: path.resolve(values.out),
    })
    return
  }

  let slugs = values.slug.map(slug => slug.replace(/^\/+|\/+$/g, ""))
  if (values.changed) {
    const detected = newPostSlugs(values.changed)
    if (detected.length > MAX_POSTS_PER_PUSH) {
      annotate(
        "warning",
        `Found ${detected.length} new posts in one push (${detected.join(
          ", "
        )}). That looks like a bulk change, so nothing was posted. Run the workflow manually for any you want to share.`
      )
      return
    }
    slugs.push(...detected)
  }
  if (!slugs.length) {
    console.log("No new posts to cross-post.")
    return
  }

  if (!values["dry-run"] && platforms.includes("linkedin")) {
    warnIfLinkedInTokenExpiring()
  }

  const failures = []
  for (const slug of slugs) {
    const failed = await crossPost(slug, {
      dryRun: values["dry-run"],
      platforms,
      wait: !values["no-wait"],
      force: values.force,
      out: path.resolve(values.out),
    })
    failures.push(...failed.map(platform => `${slug} → ${platform}`))
  }
  if (failures.length) {
    throw new Error(`Failed: ${failures.join(", ")}`)
  }
}

main().catch(error => {
  annotate("error", error.message)
  process.exit(1)
})
