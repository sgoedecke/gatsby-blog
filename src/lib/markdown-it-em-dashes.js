/**
 * markdown-it-em-dashes
 *
 * Turns a space-surrounded hyphen ("word - word") into an em-dash.
 *
 * SmartyPants-style punctuation already converts `--` and `---`, but a lone
 * spaced hyphen is left alone. This plugin fills that gap.
 *
 * It only rewrites text tokens, so hyphens inside inline code (`foo - bar`),
 * fenced code blocks, link URLs, and raw HTML are left untouched. Frontmatter
 * isn't part of the Markdown, so it's safe too. A line break counts as the
 * whitespace on either side of the hyphen.
 *
 * Options (all optional):
 *   spaced:      true  -> "word \u2014 word" (default). false -> tight "word\u2014word".
 *   nonBreaking: false -> when spaced, use a normal space before the dash.
 *                true  -> use a non-breaking space before the dash so it never
 *                         wraps to the start of a line.
 */

const EM_DASH = "\u2014" // —
const NBSP = "\u00A0"

// A hyphen with whitespace immediately before AND after. The capture groups
// preserve whatever whitespace was there.
const SPACED_HYPHEN = /(\s)-(\s)/g

const isBreak = token =>
  token && (token.type === "softbreak" || token.type === "hardbreak")

module.exports = (md, { spaced = true, nonBreaking = false } = {}) => {
  const dash = (_match, lead, trail) => {
    if (!spaced) return EM_DASH // drop the surrounding spaces -> tight em-dash
    return (nonBreaking ? NBSP : lead) + EM_DASH + trail
  }

  // Line breaks are separate tokens, so stand in a newline for them.
  const replace = (value, breakBefore, breakAfter) => {
    let text = (breakBefore ? "\n" : "") + value + (breakAfter ? "\n" : "")
    text = text.replace(SPACED_HYPHEN, dash)
    if (breakBefore && text.startsWith("\n")) text = text.slice(1)
    if (breakAfter && text.endsWith("\n")) text = text.slice(0, -1)
    return text
  }

  md.core.ruler.push("em_dashes", state => {
    state.tokens
      .filter(token => token.type === "inline")
      .forEach(({ children }) => {
        children.forEach((child, i) => {
          if (child.type !== "text") return
          child.content = replace(
            child.content,
            isBreak(children[i - 1]),
            isBreak(children[i + 1])
          )
        })
      })
  })
}
