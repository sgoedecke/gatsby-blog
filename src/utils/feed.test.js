const assert = require("node:assert/strict")
const { test } = require("node:test")
const config = require("../../gatsby-config")

const { feeds } = config.plugins.find(
  plugin => plugin.resolve === "gatsby-plugin-feed"
).options

for (const feed of feeds) {
  test(`${feed.output} links footnotes and backlinks to their own post`, () => {
    const html = [
      '<p>Text<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup></p>',
      '<div class="footnotes"><ol><li id="fn-1">',
      '<p>Footnote text <a href="#fnref-1" class="footnote-backref">Back</a></p>',
      "</li></ol></div>",
      '<a class="footnote-ref" href="#fn-named-note">Named note</a>',
      '<a href="#section">Section</a>',
      '<a href="https://example.com/#fn-1">External note</a>',
      '<code>&lt;a href="#fn-1"&gt;</code>',
    ].join("\n")
    const nodes = ["/first-post/", "/second-post/"].map(slug => ({
      html,
      fields: { slug },
      frontmatter: { title: slug, date: "2026-09-16" },
    }))

    for (const siteUrl of [
      "https://seangoedecke.com/",
      "https://seangoedecke.com",
    ]) {
      const entries = feed.serialize({
        query: {
          site: { siteMetadata: { siteUrl } },
          allMarkdownRemark: { nodes },
        },
      })
      entries.forEach((entry, index) => {
        const node = nodes[index]
        const postUrl = `https://seangoedecke.com${node.fields.slug}`
        assert.equal(
          entry.custom_elements[0]["content:encoded"],
          html
            .replace('href="#fn-1"', `href="${postUrl}#fn-1"`)
            .replace('href="#fnref-1"', `href="${postUrl}#fnref-1"`)
            .replace('href="#fn-named-note"', `href="${postUrl}#fn-named-note"`)
        )
        assert.equal(node.html, html)
        assert.equal(entry.title, node.frontmatter.title)
        assert.equal(entry.date, "Wed, 16 Sep 2026 00:00:00 GMT")
        assert.equal(entry.url, siteUrl + node.fields.slug)
        assert.equal(entry.guid, entry.url)
      })
    }
  })
}
