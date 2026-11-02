// Post data helpers: the collection logic that used to live in gatsby-node.js
// and the GraphQL page queries.

const { getDiscussionLinks } = require("../utils/discussion-links")

const BLOG_GLOB = "content/blog/*/index.md"
// Files kept next to a post that are published at the post's URL.
const POST_ASSET_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "svg", "webp", "mp4"]

const formatDate = date =>
  new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

const byDesc = key => (a, b) => (key(b) > key(a) ? 1 : key(b) < key(a) ? -1 : 0)
const dateOf = post => new Date(post.data.date).getTime()
const orderOf = post => Number(post.data.order) || 0
const popularityScore = post => Number(post.data.popularity?.score || 0)

const slugOf = post => post.page.fileSlug

// Ties are broken by slug, descending, which is the order Gatsby happened to
// produce, so posts with the same `order` or date don't swap places.
const byOrder = posts =>
  [...posts].sort((a, b) => byDesc(orderOf)(a, b) || byDesc(slugOf)(a, b))
const byDate = posts =>
  [...posts].sort((a, b) => byDesc(dateOf)(a, b) || byDesc(slugOf)(a, b))
// Gatsby's query sorted by score descending but `order` ascending.
const byPopularity = posts =>
  [...posts].sort(
    (a, b) =>
      byDesc(popularityScore)(a, b) ||
      byDesc(orderOf)(b, a) ||
      byDesc(slugOf)(a, b)
  )

const discussionLinks = post => getDiscussionLinks(post.data.popularity)

const tagUrl = tag => `/tags/${tag.toLowerCase()}/`

// Tags with their post counts, most used first.
const tagCounts = posts => {
  const counts = new Map()
  posts.forEach(post =>
    (post.data.tags || []).forEach(tag =>
      counts.set(tag, (counts.get(tag) || 0) + 1)
    )
  )
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort(
      (a, b) =>
        b.count - a.count ||
        a.tag.localeCompare(b.tag, undefined, { sensitivity: "base" })
    )
}

const decodeEntities = text =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")

const stripFootnotes = html =>
  html ? html.replace(/<sup\b[^>]*>.*?<\/sup>/gi, "") : ""

const htmlToPlainText = html =>
  html ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : ""

// underscore.string's prune(), which Gatsby used for excerpts: cut at a word
// boundary at or before `length` characters and append an ellipsis.
function prune(text, length) {
  if (text.length <= length) return text
  let template = text
    .slice(0, length + 1)
    .replace(/.(?=\W*\w*$)/g, c => (c.toUpperCase() !== c.toLowerCase() ? "A" : " "))
  if (template.slice(template.length - 2).match(/\w\w/)) {
    template = template.replace(/\s*\S+$/, "")
  } else {
    template = template.slice(0, template.length - 1).replace(/\s+$/, "")
  }
  return (template + "…").length > text.length
    ? text
    : text.slice(0, template.length) + "…"
}

// A plain-text summary of rendered post HTML, like Gatsby's `excerpt` field.
const excerpt = (html, length) => {
  const body = stripFootnotes(html).replace(/<div class="footnotes">[\s\S]*$/, "")
  const text = decodeEntities(
    body
      .replace(/<pre[\s\S]*?<\/pre>/g, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
  )
  return prune(text, length)
}

const buildPreviewSnippet = (html, url, minWords) => {
  const paragraphs = stripFootnotes(html).match(/<p>.*?<\/p>/gis) || []
  const selected = []
  let wordCount = 0

  for (const paragraph of paragraphs) {
    const words = htmlToPlainText(paragraph).split(/\s+/).filter(Boolean)
    if (words.length === 0) continue
    selected.push(paragraph)
    wordCount += words.length
    if (wordCount >= minWords) break
  }

  if (selected.length === 0) return null

  const last = selected.length - 1
  selected[last] = selected[last].replace(
    /<\/p>$/i,
    `<br /><a href="${url}">Continue reading...</a></p>`
  )
  return selected.join("")
}

// The related post shown at the end of a post: the older post sharing the
// most tags (newest on ties), falling back to newer posts if none are older.
const relatedPost = (post, posts) => {
  const tags = post.data.tags || []
  if (tags.length === 0) return null

  const shared = new Set(tags.map(tag => tag.toLowerCase()))
  const overlap = candidate =>
    (candidate.data.tags || []).filter(tag => shared.has(tag.toLowerCase()))
      .length

  const candidates = posts.filter(
    candidate => candidate.url !== post.url && overlap(candidate) > 0
  )
  const older = candidates.filter(candidate => dateOf(candidate) < dateOf(post))
  const pool = older.length > 0 ? older : candidates

  return pool.reduce((best, candidate) => {
    if (!best) return candidate
    const difference = overlap(candidate) - overlap(best)
    if (difference > 0) return candidate
    if (difference === 0 && dateOf(candidate) > dateOf(best)) return candidate
    return best
  }, null)
}

const relatedPreview = (post, posts) => {
  const related = relatedPost(post, posts)
  if (!related) return null
  const snippetHtml = buildPreviewSnippet(related.content, related.url, 60)
  return snippetHtml && { url: related.url, title: related.data.title, snippetHtml }
}

module.exports = {
  BLOG_GLOB,
  POST_ASSET_EXTENSIONS,
  byDate,
  byOrder,
  byPopularity,
  discussionLinks,
  excerpt,
  formatDate,
  prune,
  relatedPreview,
  tagCounts,
  tagUrl,
}
