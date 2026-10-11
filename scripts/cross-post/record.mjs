import YAML from "yaml"

const FRONTMATTER = /^---\n([\s\S]*?)\n---/

export function readCrossPosts(raw) {
  const match = raw.match(FRONTMATTER)
  if (!match) return {}
  const crossPosts = YAML.parse(match[1])?.crossPosts
  return crossPosts && typeof crossPosts === "object" ? crossPosts : {}
}

// Records a posted URL in the post's frontmatter, rewriting only the
// `crossPosts` block so the rest of the frontmatter keeps its formatting.
export function recordCrossPost(raw, platform, url) {
  const match = raw.match(FRONTMATTER)
  if (!match) throw new Error("missing frontmatter")

  const crossPosts = { ...readCrossPosts(raw), [platform]: url }
  const block = [
    "crossPosts:",
    ...Object.entries(crossPosts).map(
      ([key, value]) => `  ${key}: ${JSON.stringify(value)}`
    ),
  ]

  const lines = match[1].split("\n")
  const start = lines.findIndex(line => /^crossPosts:/.test(line))
  if (start === -1) {
    lines.push(...block)
  } else {
    let end = start + 1
    while (end < lines.length && /^\s+\S/.test(lines[end])) end++
    lines.splice(start, end - start, ...block)
  }
  return `---\n${lines.join("\n")}\n---${raw.slice(match[0].length)}`
}
