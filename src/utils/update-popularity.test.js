const assert = require("node:assert/strict")
const { test } = require("node:test")
const matter = require("gray-matter")
const { updatePost } = require("../../update-popularity")

const now = Date.parse("2026-09-09T00:00:00Z")
const noNetwork = () => {
  throw new Error("Unexpected network request")
}
const discussion =
  "edit: this post was discussed on [HN](https://news.ycombinator.com/item?id=12345) and [Lobsters](https://lobste.rs/s/abc123/example)."

test("URL-only backfill preserves metrics, metadata, and article content exactly", async () => {
  const popularity = {
    score: 101,
    hackerNews: { points: 12, comments: 4, threads: 1 },
    lobsters: { points: 5, comments: 6, threads: 1 },
    reddit: { points: 20, comments: 2, threads: 1 },
    manual: 7,
  }
  const raw = matter.stringify(
    `\n${discussion}\n\nBody with trailing spaces.  \n`,
    {
      title: "Example",
      date: "2026-09-08",
      popular: false,
      popularity,
      tags: ["ai"],
    }
  )
  const result = await updatePost(raw, "/example/", {
    backfillUrls: true,
    now,
    fetchJson: noNetwork,
  })
  const before = matter(raw)
  const after = matter(result.nextRaw)

  assert.deepEqual(after.data, {
    ...before.data,
    popularity: {
      ...popularity,
      hackerNews: {
        ...popularity.hackerNews,
        urls: ["https://news.ycombinator.com/item?id=12345"],
      },
      lobsters: {
        ...popularity.lobsters,
        urls: ["https://lobste.rs/s/abc123/example"],
      },
      reddit: { ...popularity.reddit, urls: [] },
    },
  })
  assert.equal(after.content, before.content)
  const second = await updatePost(result.nextRaw, "/example/", {
    backfillUrls: true,
    now,
    fetchJson: noNetwork,
  })
  assert.equal(second.nextRaw, result.nextRaw)
})

test("normal updates backfill old posts without refreshing their metrics", async () => {
  const raw = matter.stringify(discussion, {
    title: "Old example",
    date: "2025-01-01",
    popularity: { score: 42 },
  })
  const result = await updatePost(raw, "/example/", {
    now,
    fetchJson: noNetwork,
  })
  assert.equal(result.stale, true)
  assert.equal(result.popularity.score, 42)
  assert.equal(
    result.popularity.hackerNews.urls[0],
    "https://news.ycombinator.com/item?id=12345"
  )
  assert.equal(matter(result.nextRaw).data.popular, undefined)
})

test("URL-only metadata does not prevent older posts getting their first metrics", async () => {
  const raw = matter.stringify("An old post with a manually stored URL.", {
    title: "Example",
    date: "2020-01-01",
    popularity: {
      hackerNews: { urls: ["https://news.ycombinator.com/item?id=12345"] },
    },
  })
  const result = await updatePost(raw, "/example/", {
    now,
    fetchJson: async () => ({
      type: "story",
      url: "https://seangoedecke.com/example/",
      score: 10,
      descendants: 2,
    }),
  })
  assert.equal(result.stale, false)
  assert.equal(result.popularity.score, 14)
  assert.equal(matter(result.nextRaw).data.popular, true)
})

test("metric refreshes use stored URLs, not different links in the article", async () => {
  const popularity = {
    score: 1,
    hackerNews: { urls: ["https://news.ycombinator.com/item?id=67890"] },
    lobsters: { urls: ["https://lobste.rs/s/def456/curated"] },
    reddit: {
      points: 55,
      comments: 12,
      threads: 1,
      urls: ["https://reddit.com/r/programming/comments/abc123/example/"],
    },
    youtube: { urls: ["https://youtu.be/example"] },
    manual: 7,
  }
  const raw = matter.stringify(discussion, {
    title: "Example",
    date: "2026-09-08",
    popularity,
  })
  const requests = []
  const fetchJson = async url => {
    requests.push(url)
    if (url === "https://hacker-news.firebaseio.com/v0/item/67890.json") {
      return {
        type: "story",
        url: "https://www.seangoedecke.com/example/",
        score: 20,
        descendants: 10,
      }
    }
    if (url === "https://lobste.rs/s/def456.json") {
      return {
        short_id: "def456",
        url: "https://seangoedecke.com/example",
        score: 2,
        comment_count: 3,
      }
    }
    throw new Error(`Unexpected URL: ${url}`)
  }
  const result = await updatePost(raw, "/example/", { now, fetchJson })
  assert.deepEqual(requests, [
    "https://hacker-news.firebaseio.com/v0/item/67890.json",
    "https://lobste.rs/s/def456.json",
  ])
  assert.equal(result.popularity.score, 68)
  assert.deepEqual(result.popularity.hackerNews, {
    ...popularity.hackerNews,
    points: 20,
    comments: 10,
    threads: 1,
  })
  assert.deepEqual(result.popularity.reddit, popularity.reddit)
  assert.deepEqual(result.popularity.youtube, popularity.youtube)
  assert.equal(matter(result.nextRaw).data.popular, true)
})

test("explicit empty URL lists suppress discovery and metric requests", async () => {
  const raw = matter.stringify(discussion, {
    title: "Example",
    date: "2026-09-08",
    popularity: {
      hackerNews: { urls: [] },
      lobsters: { urls: [] },
    },
  })
  const result = await updatePost(raw, "/example/", {
    now,
    fetchJson: noNetwork,
  })
  assert.equal(result.nextRaw, raw)
})

test("new Reddit- and YouTube-only posts get URLs without being marked popular", async () => {
  const raw = matter.stringify(
    "edit: this post got [Reddit comments](https://reddit.com/r/programming/comments/abc123/example/) and a [YouTube video](https://youtu.be/example).",
    { title: "Example", date: "2026-09-08" }
  )
  const result = await updatePost(raw, "/example/", {
    now,
    fetchJson: noNetwork,
  })
  const { data } = matter(result.nextRaw)
  assert.equal(data.popular, undefined)
  assert.equal(data.popularity.score, undefined)
  assert.deepEqual(data.popularity, {
    youtube: { urls: ["https://youtu.be/example"] },
    reddit: {
      urls: ["https://reddit.com/r/programming/comments/abc123/example/"],
    },
  })
})

test("new posts retain every discovered discussion URL when metrics are fetched", async () => {
  const raw = matter.stringify(
    "edit: comments on [HN](https://news.ycombinator.com/item?id=12345) and [HN again](https://news.ycombinator.com/item?id=67890).",
    { title: "Example", date: "2026-09-08" }
  )
  const requests = []
  const result = await updatePost(raw, "/example/", {
    now,
    fetchJson: async url => {
      requests.push(url)
      return {
        type: "story",
        url: "https://seangoedecke.com/example/",
        score: 2,
        descendants: 1,
      }
    },
  })
  assert.equal(requests.length, 2)
  assert.equal(result.popularity.score, 8)
  assert.deepEqual(result.popularity.hackerNews.urls, [
    "https://news.ycombinator.com/item?id=12345",
    "https://news.ycombinator.com/item?id=67890",
  ])
  assert.equal(result.popularity.hackerNews.threads, 2)
  assert.equal(matter(result.nextRaw).data.popular, true)
})

test("stored URL variants count each thread only once", async () => {
  const raw = matter.stringify("Article content.", {
    title: "Example",
    popularity: {
      hackerNews: {
        urls: [
          "https://news.ycombinator.com/item?source=blog&id=12345",
          "https://news.ycombinator.com/item?id=12345",
        ],
      },
    },
  })
  const requests = []
  const result = await updatePost(raw, "/example/", {
    now,
    fetchJson: async url => {
      requests.push(url)
      return {
        type: "story",
        url: "https://seangoedecke.com/example/",
        score: 2,
      }
    },
  })
  assert.deepEqual(requests, [
    "https://hacker-news.firebaseio.com/v0/item/12345.json",
  ])
  assert.equal(result.popularity.hackerNews.threads, 1)
  assert.equal(result.popularity.score, 2)
})

test("posts with no discussion URLs remain untouched", async () => {
  const raw = matter.stringify("An ordinary article.", { title: "Example" })
  const result = await updatePost(raw, "/example/", {
    now,
    fetchJson: noNetwork,
  })
  assert.equal(result.nextRaw, raw)
})

test("network failures propagate without producing an updated post", async () => {
  const raw = matter.stringify(discussion, {
    title: "Example",
    date: "2026-09-08",
  })
  await assert.rejects(
    updatePost(raw, "/example/", {
      now,
      fetchJson: async () => {
        throw new Error("Network unavailable")
      },
    }),
    /Network unavailable/
  )
})
