// Reads a post's opening paragraphs straight from its Markdown, the same ones
// page.mjs reads from the live page, so share text can be written before the
// post is published.
import { createRequire } from "node:module"
import YAML from "yaml"

import { normalizeWhitespace } from "./compose.mjs"

const require = createRequire(import.meta.url)
const markdown = require("../../src/lib/markdown")

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/
const ENDS_WITH_COLON = /:["'”’)\]]*$/

// The text of some inline tokens as the page shows it, minus footnote markers
// (page.mjs drops every <sup>, including raw HTML ones).
function inlineText(tokens) {
  let text = ""
  let insideSup = 0
  for (const token of tokens) {
    if (token.type === "html_inline") {
      if (/^<sup\b/i.test(token.content)) insideSup++
      else if (/^<\/sup\s*>/i.test(token.content)) {
        insideSup = Math.max(0, insideSup - 1)
      }
    } else if (insideSup) {
      continue
    } else if (token.type === "text" || token.type === "code_inline") {
      text += token.content
    } else if (token.type === "softbreak" || token.type === "hardbreak") {
      text += "\n"
    }
  }
  return text
}

// Splits the top-level token stream into one entry per element of the post
// body: its tag and the inline tokens inside it (per list item, for lists).
function topLevelBlocks(tokens) {
  const blocks = []
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index]
    if (token.level !== 0) continue
    if (token.type === "html_block") {
      // Comments aren't elements, so the page doesn't see them.
      if (!token.content.replace(/<!--[\s\S]*?-->/g, "").trim()) continue
      blocks.push({ tag: "html" })
      continue
    }
    if (token.nesting === 0) {
      blocks.push({ tag: token.tag || token.type })
      continue
    }
    if (token.nesting !== 1) continue

    let end = index + 1
    while (tokens[end].level !== 0) end++
    const inner = tokens.slice(index + 1, end)
    const block = { tag: token.tag || token.type }
    if (token.tag === "p") {
      block.text = normalizeWhitespace(
        inner.map(child => inlineText(child.children || [])).join(" ")
      )
    } else if (token.tag === "ol" || token.tag === "ul") {
      block.items = []
      for (const child of inner) {
        if (child.type === "list_item_open" && child.level === 1) {
          block.items.push([])
        } else if (child.type === "inline") {
          block.items.at(-1)?.push(inlineText(child.children))
        }
      }
      block.items = block.items
        .map(texts => normalizeWhitespace(texts.join(" ")))
        .filter(Boolean)
    }
    blocks.push(block)
    index = end
  }
  return blocks
}

// Mirrors the paragraph selection in page.mjs's measurePost.
export function postFromMarkdown(raw) {
  const match = raw.match(FRONTMATTER)
  const frontmatter = (match && YAML.parse(match[1])) || {}
  const body = match ? raw.slice(match[0].length) : raw
  const blocks = topLevelBlocks(markdown.parse(body, {}))

  const firstParagraph = blocks.findIndex(block => block.tag === "p")
  const paragraphs = []
  for (const block of blocks.slice(Math.max(firstParagraph, 0))) {
    const previous = paragraphs.at(-1) || ""
    if (block.items && ENDS_WITH_COLON.test(previous)) {
      const items = block.items.map((text, index) =>
        block.tag === "ol" ? `${index + 1}. ${text}` : `- ${text}`
      )
      if (items.length) paragraphs.push(items.join("\n"))
      continue
    }
    if (block.tag !== "p") break
    if (block.text) paragraphs.push(block.text)
  }

  return {
    title: normalizeWhitespace(String(frontmatter.title || "")),
    paragraphs,
  }
}
