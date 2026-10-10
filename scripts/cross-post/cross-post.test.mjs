import assert from "node:assert/strict"
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
import { oauthHeader, oauthSignature } from "./x.mjs"

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

test("composes a tweet that fits in 280 weighted characters", () => {
  const sentence =
    "This is a sentence that is exactly sixty characters long ok."
  const url =
    "https://www.seangoedecke.com/a-very-long-slug-that-is-much-longer-than-twenty-three/"
  const tweet = composeTweet({
    paragraphs: [
      `${sentence} ${sentence}`,
      `${sentence} ${sentence} ${sentence}`,
    ],
    url,
  })
  assert.ok(tweet.endsWith(`\n\n${url}`))
  const counted = tweetLength(tweet.replace(url, "x".repeat(23)))
  assert.ok(counted <= 280, `tweet is ${counted} characters`)
  assert.equal(
    tweet,
    `${sentence} ${sentence}\n\n${sentence} ${sentence}\n\n${url}`
  )
})

test("limits the tweet to four sentences", () => {
  const tweet = composeTweet({ paragraphs: ["A. B. C. D. E. F."], url: "u" })
  assert.equal(tweet, "A. B. C. D.\n\nu")
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
