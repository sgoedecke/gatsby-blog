// Post images are rendered by markdown.js as
// `<a class="post-image" href="/<slug>/x.png"><img src="/<slug>/x.png" ...></a>`.
// After a page is built, swap each of those <img>s for a <picture> with WebP and
// original-format copies at the post column width (and 2x for sharp screens),
// with width and height set so the page doesn't jump while they load. The
// link still opens the full-size original.

const path = require("node:path")
const { default: Image, generateHTML } = require("@11ty/eleventy-img")

const WIDTHS = [590, 1180]
const SIZES = "(max-width: 590px) 100vw, 590px"
const POST_IMAGE = /(<a class="post-image"[^>]*>)<img ([^>]*)>/g

const unescapeHtml = text =>
  text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")

const attribute = (attrs, name) => {
  const match = attrs.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))
  return match ? unescapeHtml(match[1]) : ""
}

// With a path prefix (the GitHub Pages mirror), Eleventy has already added
// it to `src` by the time this runs.
async function picture(attrs, outputDir, pathPrefix) {
  const src = attribute(attrs, "src")
  const sitePath = src.startsWith(pathPrefix)
    ? src.slice(pathPrefix.length - 1)
    : src
  const metadata = await Image(path.join("content/blog", decodeURI(sitePath)), {
    widths: WIDTHS,
    formats: ["webp", "auto"],
    outputDir: path.join(outputDir, path.posix.dirname(sitePath)),
    urlPath: path.posix.dirname(src) + "/",
  })
  return generateHTML(metadata, {
    alt: attribute(attrs, "alt"),
    title: attribute(attrs, "title"),
    sizes: SIZES,
    loading: "lazy",
    decoding: "async",
  })
}

async function resizePostImages(html, outputDir, pathPrefix = "/") {
  const matches = [...html.matchAll(POST_IMAGE)]
  if (matches.length === 0) return html
  const pictures = await Promise.all(
    matches.map(([, , attrs]) => picture(attrs, outputDir, pathPrefix))
  )
  let index = 0
  return html.replace(POST_IMAGE, (_, link) => link + pictures[index++])
}

module.exports = { resizePostImages }
