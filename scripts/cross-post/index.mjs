#!/usr/bin/env node
import { execFileSync } from "node:child_process"
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"

import { composeLinkedInCommentary, composeTweet } from "./compose.mjs"
import { linkedInCredentialsFromEnv, postToLinkedIn } from "./linkedin.mjs"
import { capturePost, waitForLive } from "./page.mjs"
import { postThread, xCredentialsFromEnv } from "./x.mjs"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, "../..")
const siteUrl = (
  process.env.SITE_URL || "https://www.seangoedecke.com"
).replace(/\/$/, "")
const PLATFORMS = ["x", "linkedin"]
const MAX_POSTS_PER_PUSH = 3

const usage = `Usage:
  node index.mjs --slug <slug> [--slug <slug>...] [options]
  node index.mjs --changed <before-sha>..<after-sha> [options]

Options:
  --dry-run              Capture screenshots and compose text without posting
  --platforms x,linkedin Which platforms to post to (default: both)
  --no-wait              Don't wait for the post URL to go live
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
    if (!options.platforms.includes(platform)) return
    if (!credentials) {
      annotate(
        "warning",
        `Skipping ${platform}: credentials are not configured.`
      )
      return
    }
    try {
      const link = await send(credentials)
      console.log(`Posted to ${platform}: ${link}`)
      summarize(`- Posted to ${platform}: ${link}`)
    } catch (error) {
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

async function main() {
  const { values } = parseArgs({
    options: {
      slug: { type: "string", multiple: true, default: [] },
      changed: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      platforms: { type: "string", default: PLATFORMS.join(",") },
      "no-wait": { type: "boolean", default: false },
      out: { type: "string", default: path.join(scriptDir, "out") },
      help: { type: "boolean", default: false },
    },
  })
  if (values.help || (!values.slug.length && !values.changed)) {
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
