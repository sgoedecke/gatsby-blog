const assert = require("node:assert/strict")
const { test } = require("node:test")
const fs = require("node:fs")
const path = require("node:path")
const matter = require("gray-matter")
const {
  extractDiscussionLinks,
  getDiscussionLinks,
  backfillDiscussionUrls,
} = require("./discussion-links")

test("extracts all four services in a stable order", () => {
  assert.deepEqual(
    extractDiscussionLinks(
      "edit: this post was discussed on [Reddit](https://old.reddit.com/r/programming/comments/abc123/example/), [YouTube](https://www.youtube.com/watch?v=abc123), [Lobsters](https://lobste.rs/s/abc123/example) and [HN](https://news.ycombinator.com/item?id=12345)."
    ),
    [
      { platform: "hn", url: "https://news.ycombinator.com/item?id=12345" },
      { platform: "lobsters", url: "https://lobste.rs/s/abc123/example" },
      { platform: "youtube", url: "https://www.youtube.com/watch?v=abc123" },
      {
        platform: "reddit",
        url: "https://old.reddit.com/r/programming/comments/abc123/example/",
      },
    ]
  )
})

test("omits ordinary references, footnotes and unsupported links", () => {
  assert.deepEqual(extractDiscussionLinks(""), [])
  assert.deepEqual(
    extractDiscussionLinks(
      [
        "I learned from [this video](https://www.youtube.com/watch?v=abc123).",
        "[^1]: This post was discussed on [HN](https://news.ycombinator.com/item?id=12345).",
        "edit: see this [profile](https://news.ycombinator.com/user?id=someone), [channel](https://www.youtube.com/@someone), [comment](https://lobste.rs/c/abc123), [subreddit](https://reddit.com/r/programming/) and [lookalike](https://reddit.com.example.org/comments/abc123/).",
      ].join("\n\n")
    ),
    []
  )
})

test("collects distinct discussion URLs, not follow-up comments or sources", () => {
  assert.deepEqual(
    extractDiscussionLinks(
      "edit: this post got comments on [HN](https://news.ycombinator.com/item?id=12345), [HN again](https://news.ycombinator.com/item?id=67890) and [a duplicate](https://news.ycombinator.com/item?id=12345). A commenter shared a [video](https://www.youtube.com/watch?v=unrelated).\n\nedit: More comments on [HN](https://news.ycombinator.com/item?id=98765)."
    ),
    [
      { platform: "hn", url: "https://news.ycombinator.com/item?id=12345" },
      { platform: "hn", url: "https://news.ycombinator.com/item?id=67890" },
      { platform: "hn", url: "https://news.ycombinator.com/item?id=98765" },
    ]
  )
})

test("supports bold updates, Reddit-only discussions and short YouTube links", () => {
  assert.deepEqual(
    extractDiscussionLinks(
      "**Update:** comments on [Lobsters](https://lobste.rs/s/abc123/example).\n\nThere are also some [comments](https://www.reddit.com/r/programming/comments/abc123/example/) on Reddit.\n\nI also discussed it on a podcast, which you can watch [here](https://youtu.be/abc123?si=example)."
    ).map(link => link.platform),
    ["lobsters", "youtube", "reddit"]
  )
})

test("extracts the intended platforms from existing posts", () => {
  const cases = {
    "local-models-will-not-win": ["hn", "lobsters"],
    "in-defense-of-not-understanding-your-codebase": [
      "hn",
      "lobsters",
      "youtube",
    ],
    "how-i-estimate-work": ["hn", "lobsters", "reddit"],
    "the-valley-of-engineering-despair": ["reddit"],
    "the-left-wing-case-for-ai": ["hn", "reddit"],
    "glue-work-considered-harmful": ["hn", "lobsters"],
    "how-i-use-llms": ["hn", "youtube"],
    "how-to-keep-thinking": [],
  }

  for (const [slug, platforms] of Object.entries(cases)) {
    const file = path.join(__dirname, "../..", "content/blog", slug, "index.md")
    const { content } = matter(fs.readFileSync(file, "utf8"))
    assert.deepEqual(
      [...new Set(extractDiscussionLinks(content).map(link => link.platform))],
      platforms,
      slug
    )
  }
})

test("renders only the first stored URL per service, independently of metrics", () => {
  const popularity = {
    hackerNews: {
      comments: 0,
      urls: [
        "https://news.ycombinator.com/item?id=12345",
        "https://news.ycombinator.com/item?id=67890",
      ],
    },
    lobsters: { comments: 100, urls: [] },
    youtube: { urls: ["https://youtu.be/example"] },
    reddit: { points: 1000, threads: 4 },
  }
  assert.deepEqual(getDiscussionLinks(popularity), [
    { platform: "hn", url: popularity.hackerNews.urls[0] },
    { platform: "youtube", url: popularity.youtube.urls[0] },
  ])
  assert.deepEqual(getDiscussionLinks(), [])
  assert.deepEqual(getDiscussionLinks({}), [])
})

test("backfilling preserves authoritative URL lists, including empty lists", () => {
  const popularity = {
    score: 100,
    hackerNews: {
      points: 50,
      urls: ["https://news.ycombinator.com/item?id=12345"],
    },
    lobsters: { urls: [] },
    reddit: { points: 10, comments: 5, threads: 2 },
    manual: 12,
  }
  const content =
    "edit: this post was discussed on [HN](https://news.ycombinator.com/item?id=67890), [Lobsters](https://lobste.rs/s/abc123/example), [Reddit](https://reddit.com/r/programming/comments/abc123/example/) and [YouTube](https://youtu.be/example)."
  const result = backfillDiscussionUrls(popularity, content)

  assert.deepEqual(result, {
    ...popularity,
    reddit: {
      ...popularity.reddit,
      urls: ["https://reddit.com/r/programming/comments/abc123/example/"],
    },
    youtube: { urls: ["https://youtu.be/example"] },
  })
  assert.deepEqual(backfillDiscussionUrls(result, content), result)
  assert.equal(popularity.reddit.urls, undefined)
})

test("reports malformed frontmatter URLs instead of rendering broken links", () => {
  for (const urls of [
    "https://news.ycombinator.com/item?id=12345",
    [null],
    ["javascript:alert(1)"],
    ["https://example.com/not-hacker-news"],
  ]) {
    assert.throws(() => getDiscussionLinks({ hackerNews: { urls } }))
  }
})
