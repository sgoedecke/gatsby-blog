const unified = require("unified")
const remarkParse = require("remark-parse")

const parser = unified().use(remarkParse, { footnotes: true })

function renumberFootnotes(markdown) {
  // Mask frontmatter without changing source offsets or formatting.
  const source = markdown.replace(
    /^(?:\uFEFF)?---[ \t]*\r?\n[\s\S]*?\r?\n(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/,
    frontmatter => frontmatter.replace(/[^\r\n]/g, " ")
  )
  const references = []
  const definitions = []
  function visit(node) {
    if (node.type === "footnoteReference") references.push(node)
    if (node.type === "footnoteDefinition") definitions.push(node)
    if (node.children) node.children.forEach(visit)
  }
  visit(parser.parse(source))

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
    const end = source.indexOf("]", start)
    return { start, end, value: numbers.get(node.identifier.toLowerCase()) }
  })
  replacements.sort((a, b) => b.start - a.start)
  for (const { start, end, value } of replacements) {
    markdown = markdown.slice(0, start) + value + markdown.slice(end)
  }
  return markdown
}

module.exports = { renumberFootnotes }
