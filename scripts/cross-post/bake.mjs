#!/usr/bin/env node
// Writes each post's automatic share text into its `crossPostText`
// frontmatter, so it can be tweaked by hand before the post is shared.
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"

import { composeCrossPostText } from "./compose.mjs"
import { capturePost, launchBrowser } from "./page.mjs"
import { readCrossPostText, setCrossPostText } from "./record.mjs"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, "../..")
const blogDir = path.join(repoRoot, "content/blog")
const siteUrl = (
  process.env.SITE_URL || "https://www.seangoedecke.com"
).replace(/\/$/, "")

const usage = `Usage: node bake.mjs [--slug <slug>...] [--overwrite] [--concurrency 4]

Reads each post from the live site (or SITE_URL) and writes the text that would
be cross-posted into its crossPostText frontmatter. Without --slug, does every
post. Platforms that already have text are left alone unless --overwrite.`

const { values } = parseArgs({
  options: {
    slug: { type: "string", multiple: true, default: [] },
    overwrite: { type: "boolean", default: false },
    concurrency: { type: "string", default: "4" },
    help: { type: "boolean", default: false },
  },
})
if (values.help) {
  console.log(usage)
  process.exit(0)
}

const slugs = values.slug.length
  ? values.slug.map(slug => slug.replace(/^\/+|\/+$/g, ""))
  : readdirSync(blogDir).filter(slug =>
      existsSync(path.join(blogDir, slug, "index.md"))
    )

const browser = await launchBrowser()
const failures = []
let updated = 0
let next = 0

async function bake(slug) {
  const file = path.join(blogDir, slug, "index.md")
  if (!existsSync(file)) throw new Error(`No post at ${file}`)
  const existing = readCrossPostText(readFileSync(file, "utf8"))
  if (!values.overwrite && existing.x && existing.linkedin) return

  const post = await capturePost(`${siteUrl}/${slug}/`, {
    browser,
    screenshotCount: 0,
  })
  if (!post.paragraphs.length) throw new Error("found no opening paragraphs")
  const composed = composeCrossPostText(post)
  const text = values.overwrite ? composed : { ...composed, ...existing }

  // Reread in case the file changed while the page loaded.
  const raw = readFileSync(file, "utf8")
  const result = setCrossPostText(raw, text)
  if (result !== raw) {
    writeFileSync(file, result)
    updated++
    console.log(`Updated ${slug}`)
  }
}

async function worker() {
  while (next < slugs.length) {
    const slug = slugs[next++]
    try {
      await bake(slug)
    } catch (error) {
      failures.push(slug)
      console.error(`Skipped ${slug}: ${error.message}`)
    }
  }
}

try {
  await Promise.all(
    Array.from({ length: Math.max(1, Number(values.concurrency)) }, worker)
  )
} finally {
  await browser.close()
}
console.log(`\nUpdated ${updated} of ${slugs.length} posts.`)
if (failures.length) {
  console.error(`Failed: ${failures.join(", ")}`)
  process.exit(1)
}
