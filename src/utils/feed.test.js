const assert = require("node:assert/strict")
const { test } = require("node:test")
const { feedItem, renderFeed } = require("../lib/feed")

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

const post = (slug, date = "2026-09-16", order = 1) => ({
  url: `/${slug}/`,
  content: html,
  page: { fileSlug: slug },
  data: { title: slug, date, order },
})

test("feed items link footnotes and backlinks to their own post", () => {
  for (const siteUrl of [
    "https://seangoedecke.com/",
    "https://seangoedecke.com",
  ]) {
    for (const slug of ["first-post", "second-post"]) {
      const item = feedItem(post(slug), siteUrl)
      const postUrl = `https://seangoedecke.com/${slug}/`
      assert.equal(
        item.html,
        html
          .replace('href="#fn-1"', `href="${postUrl}#fn-1"`)
          .replace('href="#fnref-1"', `href="${postUrl}#fnref-1"`)
          .replace('href="#fn-named-note"', `href="${postUrl}#fn-named-note"`)
      )
      assert.equal(item.title, slug)
      assert.equal(item.date, "Wed, 16 Sep 2026 00:00:00 GMT")
      assert.equal(item.url, postUrl)
      assert.equal(item.guid, postUrl)
    }
  }
})

test("feed lists the 30 newest posts by date", () => {
  const day = i => new Date(Date.UTC(2026, 0, 1 + i)).toISOString().slice(0, 10)
  const posts = Array.from({ length: 35 }, (_, i) => post(`post-${i}`, day(i), i))
  const xml = renderFeed({
    posts,
    site: {
      siteUrl: "https://seangoedecke.com",
      feedTitle: "Feed",
      description: "Blog",
    },
    buildDate: new Date("2026-09-16T00:00:00Z"),
  })
  const guids = [...xml.matchAll(/<guid isPermaLink="false">([^<]+)<\/guid>/g)].map(m => m[1])
  assert.equal(guids.length, 30)
  assert.equal(guids[0], "https://seangoedecke.com/post-34/")
  assert.equal(guids[29], "https://seangoedecke.com/post-5/")
  assert.match(xml, /<lastBuildDate>Wed, 16 Sep 2026 00:00:00 GMT<\/lastBuildDate>/)
})
