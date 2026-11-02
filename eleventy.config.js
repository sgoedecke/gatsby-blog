const fs = require("fs")
const markdown = require("./src/lib/markdown")
const { BLOG_GLOB, byOrder } = require("./src/lib/posts")

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", markdown)

  // Newest first, by each post's `order` frontmatter.
  eleventyConfig.addCollection("posts", collectionApi =>
    byOrder(collectionApi.getFilteredByGlob(BLOG_GLOB))
  )

  eleventyConfig.addPassthroughCopy({ static: "/" })
  eleventyConfig.addPassthroughCopy({ "src/styles": "styles" })
  eleventyConfig.addPassthroughCopy({
    "node_modules/prismjs/themes/prism-tomorrow.css": "styles/prism-tomorrow.css",
  })
  eleventyConfig.addPassthroughCopy({ "src/assets/sidenotes.js": "sidenotes.js" })
  // Images and videos sit next to each post and are served from its URL.
  for (const dir of fs.readdirSync("content/blog")) {
    if (!fs.statSync(`content/blog/${dir}`).isDirectory()) continue
    eleventyConfig.addPassthroughCopy({
      [`content/blog/${dir}/*.{png,jpg,jpeg,gif,svg,webp,mp4}`]: dir,
    })
  }

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

  eleventyConfig.setServerOptions({ port: 8000 })

  return {
    templateFormats: ["md", "11ty.js"],
    dir: {
      input: ".",
      includes: "src/_includes",
      data: "src/_data",
      output: "public",
    },
  }
}
