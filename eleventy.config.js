const site = require("./src/_data/site")
const markdown = require("./src/lib/markdown")
const { resizePostImages } = require("./src/lib/images")
const { BLOG_GLOB, POST_ASSET_EXTENSIONS, byOrder } = require("./src/lib/posts")

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", markdown)

  // Newest first, by each post's `order` frontmatter.
  eleventyConfig.addCollection("posts", collectionApi =>
    byOrder(collectionApi.getFilteredByGlob(BLOG_GLOB))
  )

  eleventyConfig.addTransform("post-images", async function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content
    return resizePostImages(
      content,
      eleventyConfig.directories.output,
      site.pathPrefix
    )
  })

  eleventyConfig.addPassthroughCopy({ static: "/" })
  eleventyConfig.addPassthroughCopy({ "src/styles": "styles" })
  eleventyConfig.addPassthroughCopy({
    "node_modules/prismjs/themes/prism-tomorrow.css": "styles/prism-tomorrow.css",
  })
  eleventyConfig.addPassthroughCopy({ "src/assets/sidenotes.js": "sidenotes.js" })
  // Images and videos sit next to each post and are served from its URL.
  eleventyConfig.addPassthroughCopy(
    { "content/blog": "/" },
    { filter: [`*/*.{${POST_ASSET_EXTENSIONS.join(",")}}`] }
  )

  for (const ignored of [
    "README.md",
    "AGENTS.md",
    "content/!(blog)/**",
    // Notes and reports kept beside a post aren't published.
    "content/blog/*/!(index).md",
    "scripts/**",
  ]) {
    eleventyConfig.ignores.add(ignored)
  }

  if (site.pathPrefix !== "/") {
    // Prefix root-relative URLs in the HTML (links, images, styles) with
    // the path prefix.
    eleventyConfig.addPlugin(
      eleventyConfig.resolvePlugin("@11ty/eleventy/html-base-plugin")
    )
    // Posts link to each other with full seangoedecke.com URLs too. Keep
    // mirror readers on the mirror; the base plugin then adds the prefix.
    // Links marked `data-main-site` (the mirror banner) are left alone.
    eleventyConfig.htmlTransformer.addPosthtmlPlugin("html", () => tree => {
      tree.match({ tag: "a" }, node => {
        const attrs = node.attrs || {}
        if (attrs.href && !("data-main-site" in attrs)) {
          attrs.href =
            attrs.href.replace(
              /^https?:\/\/(www\.)?seangoedecke\.com(?=[/?#]|$)/,
              ""
            ) || "/"
        }
        return node
      })
      return tree
    })
  }

  eleventyConfig.setServerOptions({ port: 8000 })

  return {
    pathPrefix: site.pathPrefix,
    templateFormats: ["md", "11ty.js"],
    // Posts are plain Markdown; don't run them through Liquid first, which
    // would eat `{{ ... }}` and `{% ... %}` in code samples.
    markdownTemplateEngine: false,
    dir: {
      input: ".",
      includes: "src/_includes",
      data: "src/_data",
      output: "public",
    },
  }
}
