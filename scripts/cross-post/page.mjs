import { chromium, devices } from "playwright"

import { normalizeWhitespace } from "./compose.mjs"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function waitForLive(
  url,
  { timeoutMs = 20 * 60 * 1000, intervalMs = 20 * 1000, log = console.log } = {}
) {
  const deadline = Date.now() + timeoutMs
  for (;;) {
    let status
    try {
      const response = await fetch(url, {
        headers: { "Cache-Control": "no-cache" },
      })
      status = response.status
      if (response.ok) return
    } catch (error) {
      status = error.message
    }
    if (Date.now() + intervalMs > deadline) {
      throw new Error(
        `${url} still not live after ${Math.round(
          timeoutMs / 60000
        )} minutes (last status: ${status}). Did the Netlify deploy fail?`
      )
    }
    log(`${url} returned ${status}; checking again in ${intervalMs / 1000}s`)
    await sleep(intervalMs)
  }
}

// Runs in the browser. Picks screenshot regions that each fit in one phone
// screen and end in the gap between two blocks, so no line is cut in half.
function measurePost(screenshotCount) {
  const clean = element => {
    const clone = element.cloneNode(true)
    clone.querySelectorAll("sup, .footnote-ref").forEach(node => node.remove())
    return clone.textContent.replace(/\s+/g, " ").trim()
  }
  const absolute = element => {
    const rect = element.getBoundingClientRect()
    return {
      top: rect.top + window.scrollY,
      bottom: rect.bottom + window.scrollY,
    }
  }

  const title = document.querySelector("article h1")
  const section = document.querySelector("article > section")
  const blocks = Array.from(section.children)
    .map(element => ({ ...absolute(element), text: clean(element) }))
    .filter(block => block.bottom > block.top)

  const boundaries = blocks.map((block, index) => {
    const next = blocks[index + 1]
    return next
      ? (block.bottom + next.top) / 2
      : Math.min(block.bottom + 24, document.documentElement.scrollHeight)
  })

  const height = window.innerHeight
  const regions = []
  let start = 0
  for (let i = 0; i < screenshotCount; i++) {
    const limit = start + height
    const fitting = boundaries.filter(
      boundary => boundary <= limit && boundary > start + height * 0.4
    )
    const end = fitting.length ? Math.max(...fitting) : limit
    const visible = blocks.filter(
      block => block.top >= start - 1 && block.bottom <= end + 1
    )
    const altText = [i === 0 ? clean(title) : "", ...visible.map(b => b.text)]
      .filter(Boolean)
      .join("\n\n")
    regions.push({
      y: Math.round(start),
      height: Math.round(end - start),
      altText,
    })
    start = end
    if (end >= boundaries[boundaries.length - 1]) break
  }

  const paragraphs = Array.from(section.children)
    .filter(element => element.tagName === "P")
    .slice(0, 8)
    .map(clean)
    .filter(Boolean)

  return {
    title: clean(title),
    description:
      document.querySelector('meta[name="description"]')?.content || "",
    paragraphs,
    regions,
    width: window.innerWidth,
  }
}

export async function capturePost(url, { screenshotCount = 2 } = {}) {
  const browser = await chromium.launch()
  try {
    const context = await browser.newContext({
      ...devices["iPhone 13"],
      colorScheme: "light",
    })
    const page = await context.newPage()
    await page.goto(url, { waitUntil: "networkidle" })
    await page.evaluate(() => document.fonts.ready)

    const measured = await page.evaluate(measurePost, screenshotCount)
    const screenshots = []
    for (const region of measured.regions) {
      const buffer = await page.screenshot({
        fullPage: true,
        clip: {
          x: 0,
          y: region.y,
          width: measured.width,
          height: region.height,
        },
      })
      screenshots.push({ buffer, altText: region.altText })
    }

    return {
      title: measured.title,
      description: normalizeWhitespace(measured.description),
      paragraphs: measured.paragraphs,
      screenshots,
    }
  } finally {
    await browser.close()
  }
}
