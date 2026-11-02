import YAML from "yaml"

const FRONTMATTER = /^---\n([\s\S]*?)\n---/

function readFrontmatter(raw) {
  const match = raw.match(FRONTMATTER)
  return (match && YAML.parse(match[1])) || {}
}

export function readCrossPosts(raw) {
  const crossPosts = readFrontmatter(raw).crossPosts
  return crossPosts && typeof crossPosts === "object" ? crossPosts : {}
}

// Hand-editable share text in the post's frontmatter, used instead of the
// automatic excerpt. Platforms without a non-empty entry get the excerpt.
export function readCrossPostText(raw) {
  const text = readFrontmatter(raw).crossPostText
  if (!text || typeof text !== "object") return {}
  return Object.fromEntries(
    Object.entries(text)
      .filter(([, value]) => typeof value === "string" && value.trim())
      .map(([platform, value]) => [platform, value.trim()])
  )
}

// Replaces (or appends) one top-level key's block in the frontmatter, leaving
// the rest of the frontmatter's formatting untouched.
function setFrontmatterBlock(raw, key, block) {
  const match = raw.match(FRONTMATTER)
  if (!match) throw new Error("missing frontmatter")

  const lines = match[1].split("\n")
  const start = lines.findIndex(line => line.startsWith(`${key}:`))
  if (start === -1) {
    lines.push(...block)
  } else {
    // The block runs until the next top-level key. Blank lines can sit inside
    // it (in multiline strings), but trailing ones belong to what follows.
    let end = start + 1
    while (end < lines.length && /^(\s|$)/.test(lines[end])) end++
    while (end > start + 1 && !lines[end - 1].trim()) end--
    lines.splice(start, end - start, ...block)
  }
  return `---\n${lines.join("\n")}\n---${raw.slice(match[0].length)}`
}

// Records a posted URL in the post's frontmatter.
export function recordCrossPost(raw, platform, url) {
  const crossPosts = { ...readCrossPosts(raw), [platform]: url }
  return setFrontmatterBlock(raw, "crossPosts", [
    "crossPosts:",
    ...Object.entries(crossPosts).map(
      ([key, value]) => `  ${key}: ${JSON.stringify(value)}`
    ),
  ])
}

// Written as literal blocks, so the text can be edited by hand without
// worrying about quotes or escaping.
function yamlText(text) {
  const body = text
    .split("\n")
    .map(line => (line ? `    ${line}` : ""))
    .join("\n")
  return ` |-\n${body}`
}

export function setCrossPostText(raw, text) {
  const entries = Object.entries(text).filter(([, value]) => value)
  const updated = setFrontmatterBlock(raw, "crossPostText", [
    "crossPostText:",
    ...entries.map(([platform, value]) => `  ${platform}:${yamlText(value)}`),
  ])
  const written = readCrossPostText(updated)
  for (const [platform, value] of entries) {
    if (written[platform] !== value.trim()) {
      throw new Error(`crossPostText.${platform} didn't round-trip through YAML`)
    }
  }
  return updated
}
