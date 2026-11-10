import { composeCrossPostText } from "./compose.mjs"
import {
  readCrossPostText,
  readCrossPosts,
  setCrossPostText,
} from "./record.mjs"
import { postFromMarkdown } from "./source.mjs"

const PLATFORMS = ["x", "linkedin"]

// Fills in the automatic share text for each platform the post hasn't been
// shared to yet, so it can be reviewed and tweaked before it's posted. Text
// that is still the automatic text for `before` (the previous version of the
// post) is refreshed to match the new opening; hand-edited text is left alone.
export function fillCrossPostText(raw, before = null) {
  if (!raw.startsWith("---\n")) return raw
  const posted = readCrossPosts(raw)
  const pending = PLATFORMS.filter(platform => !posted[platform])
  if (!pending.length) return raw

  const existing = readCrossPostText(raw)
  const composed = composeCrossPostText(postFromMarkdown(raw))
  const previous =
    before === null ? {} : composeCrossPostText(postFromMarkdown(before))

  const text = { ...existing }
  for (const platform of pending) {
    const automatic =
      !existing[platform] || existing[platform] === previous[platform]
    if (automatic && composed[platform]) text[platform] = composed[platform]
  }
  if (Object.keys(text).every(key => text[key] === existing[key])) return raw
  return setCrossPostText(raw, text)
}
