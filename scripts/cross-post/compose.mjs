export const TWEET_LIMIT = 280
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
    const words = candidate.split(" ")
    const lastWord = words[words.length - 1]
    if (ABBREVIATIONS.has(lastWord.toLowerCase())) continue
    // A middle initial, as in "James C. Scott".
    if (
      /^[A-Z]\.$/.test(lastWord) &&
      /^[A-Z][a-z]+$/.test(words[words.length - 2] || "")
    ) {
      continue
    }
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

function joinSentences(chosen) {
  return chosen
    .map(({ text, startsParagraph }, index) =>
      index === 0 ? text : `${startsParagraph ? "\n\n" : " "}${text}`
    )
    .join("")
}

const LIST_ITEM = /^(\d+\.|[-•]) /
const ENDS_WITH_COLON = /:["'”’)\]]*$/

// A list (one item per line, each starting with a marker) is kept whole, as
// a single unit, since a partial list or a merged one reads badly.
function paragraphUnits(paragraph) {
  if (LIST_ITEM.test(paragraph)) return [paragraph.trim()]
  return splitSentences(paragraph)
}

// Builds an excerpt from whole sentences, preserving paragraph breaks, that
// satisfies `fits`. It never ends on a sentence that introduces what follows
// (one ending in a colon), unless `allowColon` is set and nothing else fits.
// Falls back to a word-truncated first sentence.
export function buildExcerpt(
  paragraphs,
  fits,
  { maxSentences = 4, allowColon = false } = {}
) {
  const chosen = []
  collect: for (const paragraph of paragraphs) {
    const sentences = paragraphUnits(paragraph)
    for (const [index, text] of sentences.entries()) {
      const next = [...chosen, { text, startsParagraph: index === 0 }]
      if (chosen.length >= maxSentences || !fits(joinSentences(next))) {
        break collect
      }
      chosen.push(next[next.length - 1])
    }
  }

  const complete = chosen.slice()
  while (complete.length && ENDS_WITH_COLON.test(complete.at(-1).text)) {
    complete.pop()
  }
  if (complete.length) return joinSentences(complete)
  if (allowColon && chosen.length) return joinSentences(chosen)

  const first = paragraphUnits(paragraphs[0] || "")[0]
  if (!first || (!allowColon && ENDS_WITH_COLON.test(first))) return ""
  return fits(first) ? first : truncateToWords(first, fits)
}

// The teaser tweet has no link (the link goes in a reply), so the excerpt can
// use the full character limit. It may end on a colon as a last resort, since
// the attached screenshots show what follows.
export function composeTweet({ paragraphs, title }) {
  const excerpt = buildExcerpt(
    paragraphs,
    text => tweetLength(text) <= TWEET_LIMIT,
    { maxSentences: 4, allowColon: true }
  )
  return excerpt || title
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
