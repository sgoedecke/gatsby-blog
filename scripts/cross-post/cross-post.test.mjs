import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

import {
  buildExcerpt,
  composeLinkedInCommentary,
  composeTweet,
  escapeLittleText,
  splitSentences,
  tweetLength,
} from "./compose.mjs"
import { buildLinkedInPost } from "./linkedin.mjs"
import { readCrossPosts, recordCrossPost } from "./record.mjs"
import { oauthHeader, oauthSignature, postThread } from "./x.mjs"

test("splits sentences without breaking on abbreviations", () => {
  assert.deepEqual(
    splitSentences(
      "I use tools, e.g. Copilot. It's fine! Is it “good”? Maybe.  Who knows"
    ),
    [
      "I use tools, e.g. Copilot.",
      "It's fine!",
      "Is it “good”?",
      "Maybe.",
      "Who knows",
    ]
  )
})

test("does not split on decimals or lowercase continuations", () => {
  assert.deepEqual(splitSentences("GPT-4.5 is out. version 2 too."), [
    "GPT-4.5 is out. version 2 too.",
  ])
})

test("counts tweet length with twitter-text weights", () => {
  assert.equal(tweetLength("hello — “world”"), 15)
  assert.equal(tweetLength("日本"), 4)
  assert.equal(tweetLength("👍"), 2)
})

test("builds excerpts from whole sentences and keeps paragraph breaks", () => {
  const excerpt = buildExcerpt(
    ["One. Two.", "Three. Four is longer."],
    text => text.length <= 20
  )
  assert.equal(excerpt, "One. Two.\n\nThree.")
})

test("truncates an over-long first sentence at a word boundary", () => {
  const excerpt = buildExcerpt(
    ["This first sentence is far too long to fit."],
    text => text.length <= 20
  )
  assert.equal(excerpt, "This first sentence…")
})

test("composes a link-free tweet that fits in 280 weighted characters", () => {
  const sentence = `Start ${"word ".repeat(18)}ends here.`
  const tweet = composeTweet({
    paragraphs: [`${sentence} ${sentence} ${sentence}`],
    title: "Title",
  })
  assert.equal(tweet, `${sentence} ${sentence}`)
  assert.ok(tweetLength(tweet) <= 280)
})

test("falls back to the title when there are no paragraphs", () => {
  assert.equal(composeTweet({ paragraphs: [], title: "Title" }), "Title")
})

test("limits the tweet to four sentences", () => {
  const tweet = composeTweet({ paragraphs: ["A. B. C. D. E. F."], title: "T" })
  assert.equal(tweet, "A. B. C. D.")
})

test("composes a longer LinkedIn excerpt", () => {
  const commentary = composeLinkedInCommentary({
    paragraphs: ["One. Two. Three.", "Four. Five. Six. Seven."],
  })
  assert.equal(commentary, "One. Two. Three.\n\nFour. Five. Six.")
})

test("escapes LinkedIn little text reserved characters", () => {
  assert.equal(
    escapeLittleText("a (b) [c] {d} <e> #f @g *h _i ~j |k \\l"),
    "a \\(b\\) \\[c\\] \\{d\\} \\<e\\> \\#f \\@g \\*h \\_i \\~j \\|k \\\\l"
  )
})

test("builds a LinkedIn article post", () => {
  const post = buildLinkedInPost({
    personUrn: "urn:li:person:abc",
    commentary: "Hi (there)",
    url: "https://example.com/post/",
    title: "Title",
    description: "",
  })
  assert.equal(post.author, "urn:li:person:abc")
  assert.equal(post.commentary, "Hi \\(there\\)")
  assert.deepEqual(post.content, {
    article: { source: "https://example.com/post/", title: "Title" },
  })
})

test("matches the OAuth 1.0a signature example from Twitter's docs", () => {
  const signature = oauthSignature({
    method: "POST",
    url: "https://api.twitter.com/1.1/statuses/update.json",
    params: {
      status: "Hello Ladies + Gentlemen, a signed OAuth request!",
      include_entities: "true",
      oauth_consumer_key: "xvz1evFS4wEEPTGEFPHBog",
      oauth_nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: "1318622958",
      oauth_token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
      oauth_version: "1.0",
    },
    consumerSecret: "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw",
    tokenSecret: "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE",
  })
  assert.equal(signature, "hCtSmYh+iHYCEqBWrE7C7hYmtUk=")
})

test("builds an OAuth header that includes query parameters in the signature", () => {
  const header = oauthHeader({
    method: "POST",
    url:
      "https://api.twitter.com/1.1/statuses/update.json?include_entities=true",
    credentials: {
      apiKey: "xvz1evFS4wEEPTGEFPHBog",
      apiSecret: "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw",
      accessToken: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
      accessTokenSecret: "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE",
    },
    nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
    timestamp: "1318622958",
  })
  assert.match(header, /^OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", /)
  assert.match(header, /oauth_signature="[^"]+"/)
  assert.doesNotMatch(header, /include_entities/)
})

const credentials = {
  apiKey: "key",
  apiSecret: "secret",
  accessToken: "token",
  accessTokenSecret: "token-secret",
}

function stubFetch(t, respond) {
  const calls = []
  const original = globalThis.fetch
  globalThis.fetch = async (url, init) => {
    const call = { path: new URL(url).pathname, body: JSON.parse(init.body) }
    calls.push(call)
    const [status, json] = respond(call, calls.length)
    return new Response(JSON.stringify(json), { status })
  }
  t.after(() => {
    globalThis.fetch = original
  })
  return calls
}

test("posts the teaser with images, then replies with the link", async t => {
  let nextId = 100
  const calls = stubFetch(t, () => [200, { data: { id: String(nextId++) } }])

  const link = await postThread(credentials, {
    text: "Teaser",
    images: [
      { buffer: Buffer.from("one"), altText: "First" },
      { buffer: Buffer.from("two"), altText: "Second" },
    ],
    replyText: "https://example.com/post/",
  })

  assert.deepEqual(
    calls.map(call => call.path),
    [
      "/2/media/upload",
      "/2/media/metadata",
      "/2/media/upload",
      "/2/media/metadata",
      "/2/tweets",
      "/2/tweets",
    ]
  )
  assert.equal(calls[0].body.media, Buffer.from("one").toString("base64"))
  assert.deepEqual(calls[1].body, {
    id: "100",
    metadata: { alt_text: { text: "First" } },
  })
  assert.deepEqual(calls[4].body, {
    text: "Teaser",
    media: { media_ids: ["100", "102"] },
  })
  assert.deepEqual(calls[5].body, {
    text: "https://example.com/post/",
    reply: { in_reply_to_tweet_id: "104" },
  })
  assert.equal(link, "https://x.com/i/status/104")
})

test("reports the teaser URL when the link reply fails", async t => {
  stubFetch(t, (call, count) =>
    count === 2 ? [403, { title: "Forbidden" }] : [200, { data: { id: "7" } }]
  )
  await assert.rejects(
    postThread(credentials, { text: "Teaser", images: [], replyText: "u" }),
    /Posted the teaser \(https:\/\/x\.com\/i\/status\/7\) but the link reply failed/
  )
})

test("never ends an excerpt on a sentence that introduces what follows", () => {
  assert.equal(
    buildExcerpt(
      ["Intro sentence. It goes like this:", "Some quoted view."],
      text => text.length <= 40
    ),
    "Intro sentence."
  )
  assert.equal(
    buildExcerpt(["It goes like this:"], () => true),
    ""
  )
})

test("records cross-posts in frontmatter without touching anything else", () => {
  const raw = readFileSync(
    new URL(
      "../../content/blog/big-tech-needs-big-egos/index.md",
      import.meta.url
    ),
    "utf8"
  )
  assert.deepEqual(readCrossPosts(raw), {})

  const once = recordCrossPost(raw, "x", "https://x.com/i/status/1")
  const twice = recordCrossPost(
    once,
    "linkedin",
    "https://www.linkedin.com/feed/update/urn:li:share:2/"
  )
  assert.deepEqual(readCrossPosts(twice), {
    x: "https://x.com/i/status/1",
    linkedin: "https://www.linkedin.com/feed/update/urn:li:share:2/",
  })

  const frontmatterEnd = raw.indexOf("\n---", 4)
  assert.equal(
    twice,
    `${raw.slice(
      0,
      frontmatterEnd
    )}\ncrossPosts:\n  x: "https://x.com/i/status/1"\n  linkedin: "https://www.linkedin.com/feed/update/urn:li:share:2/"${raw.slice(
      frontmatterEnd
    )}`
  )
})

test("replaces an existing crossPosts block, including inline ones", () => {
  const raw = "---\ntitle: T\ncrossPosts: {}\ndate: '2026-01-01'\n---\nBody\n"
  const updated = recordCrossPost(recordCrossPost(raw, "x", "a"), "x", "b")
  assert.equal(
    updated,
    "---\ntitle: T\ncrossPosts:\n  x: \"b\"\ndate: '2026-01-01'\n---\nBody\n"
  )
})
