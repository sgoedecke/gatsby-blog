export const TWEET_LIMIT = 280
// X shortens every link to a t.co URL that counts as 23 characters.
export const TWEET_URL_LENGTH = 23
export const LINKEDIN_EXCERPT_LIMIT = 700

const ABBREVIATIONS = new Set([
  "e.g.",
  "i.e.",
  "etc.",
  "vs.",
  "cf.",
  "mr.",
  "mrs.",
  "ms.",
  "dr.",
  "prof.",
  "st.",
  "jr.",
  "sr.",
  "approx.",
  "no.",
  "u.s.",
  "u.k.",
])

// Matches the weighting in twitter-text v3: most Latin text and common
// punctuation counts as one character, everything else (CJK, emoji) as two.
const SINGLE_WEIGHT_RANGES = [
  [0, 4351],
  [8192, 8205],
  [8208, 8223],
  [8242, 8247],
]

export function tweetLength(text) {
  let length = 0
  for (const char of text) {
    const code = char.codePointAt(0)
    const single = SINGLE_WEIGHT_RANGES.some(
      ([start, end]) => code >= start && code <= end
    )
    length += single ? 1 : 2
  }
  return length
}

export function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim()
}

export function splitSentences(paragraph) {
  const text = normalizeWhitespace(paragraph)
  if (!text) return []

  const sentences = []
  const boundary = /[.!?…]+["'”’)\]]*\s+(?=["'“‘(\[]*[A-Z0-9])/g
  let start = 0
  let match
  while ((match = boundary.exec(text))) {
    const end = match.index + match[0].trimEnd().length
    const candidate = text.slice(start, end)
    const lastWord = candidate.split(" ").pop().toLowerCase()
    if (ABBREVIATIONS.has(lastWord)) continue
    sentences.push(candidate)
    start = match.index + match[0].length
  }
  if (start < text.length) sentences.push(text.slice(start))
  return sentences
}

function truncateToWords(text, fits) {
  const words = text.split(" ")
  while (words.length > 1) {
    words.pop()
    const candidate = `${words.join(" ").replace(/[,;:\s]+$/, "")}…`
    if (fits(candidate)) return candidate
  }
  return ""
}

// Builds an excerpt from whole sentences, preserving paragraph breaks, that
// satisfies `fits`. Falls back to a word-truncated first sentence.
export function buildExcerpt(paragraphs, fits, { maxSentences = 4 } = {}) {
  const sentenceParagraphs = paragraphs
    .map(splitSentences)
    .filter(sentences => sentences.length)

  let excerpt = ""
  let count = 0
  for (const sentences of sentenceParagraphs) {
    let separator = excerpt ? "\n\n" : ""
    for (const sentence of sentences) {
      if (count >= maxSentences) return excerpt
      const candidate = `${excerpt}${separator}${sentence}`
      if (!fits(candidate)) {
        return excerpt || truncateToWords(sentence, fits)
      }
      excerpt = candidate
      separator = " "
      count++
    }
  }
  return excerpt
}

export function composeTweet({ paragraphs, url }) {
  const budget = TWEET_LIMIT - TWEET_URL_LENGTH - 2
  const excerpt = buildExcerpt(
    paragraphs,
    text => tweetLength(text) <= budget,
    { maxSentences: 4 }
  )
  return excerpt ? `${excerpt}\n\n${url}` : url
}

// LinkedIn's Posts API parses commentary as "little text", where these
// characters are reserved and must be backslash-escaped to appear literally.
export function escapeLittleText(text) {
  return text.replace(/[|{}@[\]()<>#\\*_~]/g, "\\$&")
}

export function composeLinkedInCommentary({ paragraphs }) {
  return buildExcerpt(
    paragraphs,
    text => text.length <= LINKEDIN_EXCERPT_LIMIT,
    { maxSentences: 6 }
  )
}
