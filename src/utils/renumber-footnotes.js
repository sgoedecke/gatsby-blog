const unified = require("unified")
const remarkParse = require("remark-parse")

const parser = unified().use(remarkParse, { footnotes: true })

function parseMarkdown(markdown) {
  // Mask frontmatter without changing source offsets or formatting.
  const source = markdown.replace(
    /^(?:\uFEFF)?---[ \t]*\r?\n[\s\S]*?\r?\n(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/,
    frontmatter => frontmatter.replace(/[^\r\n]/g, " ")
  )
  return parser.parse(source)
}

function sortDefinitions(markdown) {
  const lineStarts = [0]
  for (const match of markdown.matchAll(/\n/g)) {
    lineStarts.push(match.index + 1)
  }
  const replacements = []
  let group = []
  function flush() {
    const sorted = [...group].sort((a, b) => a.number - b.number)
    group.forEach((definition, index) => {
      replacements.push({ ...definition, value: sorted[index].value })
    })
    group = []
  }
  for (const node of parseMarkdown(markdown).children) {
    if (node.type !== "footnoteDefinition") {
      flush()
      continue
    }
    const start = lineStarts[node.position.start.line - 1]
    // remark-parse 6 overcounts end columns on indented continuation lines.
    // Definitions occupy whole lines, so use line boundaries instead.
    const end = lineStarts[node.position.end.line] || markdown.length
    const value = markdown.slice(start, end).replace(/\r?\n$/, "")
    group.push({
      start,
      end: start + value.length,
      value,
      number: Number(node.identifier),
    })
  }
  flush()
  for (const { start, end, value } of replacements.reverse()) {
    markdown = markdown.slice(0, start) + value + markdown.slice(end)
  }
  return markdown
}

function renumberFootnotes(markdown) {
  const references = []
  const definitions = []
  function visit(node) {
    if (node.type === "footnoteReference") references.push(node)
    if (node.type === "footnoteDefinition") definitions.push(node)
    if (node.children) node.children.forEach(visit)
  }
  visit(parseMarkdown(markdown))

  const numbers = new Map()
  // Definitions can precede references. Unreferenced definitions come last so
  // their labels cannot collide with the newly numbered references.
  for (const node of [...references, ...definitions]) {
    const identifier = node.identifier.toLowerCase()
    if (!numbers.has(identifier)) {
      numbers.set(identifier, String(numbers.size + 1))
    }
  }

  const replacements = [...references, ...definitions].map(node => {
    const start = node.position.start.offset + 2
    const end = markdown.indexOf("]", start)
    return { start, end, value: numbers.get(node.identifier.toLowerCase()) }
  })
  replacements.sort((a, b) => b.start - a.start)
  for (const { start, end, value } of replacements) {
    markdown = markdown.slice(0, start) + value + markdown.slice(end)
  }
  return sortDefinitions(markdown)
}

module.exports = { renumberFootnotes }
