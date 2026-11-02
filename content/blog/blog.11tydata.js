// Every post is content/blog/<slug>/index.md, published at /<slug>/.
module.exports = {
  layout: "post.11ty.js",
  eleventyComputed: {
    permalink: data => `/${data.page.fileSlug}/`,
  },
}
