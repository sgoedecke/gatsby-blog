const fs = require("node:fs")
const { renumberFootnotes } = require("../src/utils/renumber-footnotes")
const { git, stagedMarkdown, requireFullyStaged } = require("./staged-markdown")

function main() {
  process.chdir(git(["rev-parse", "--show-toplevel"]).trimEnd())
  const changes = []
  for (const { file, staged } of stagedMarkdown()) {
    const updated = renumberFootnotes(staged)
    if (updated === staged) continue
    requireFullyStaged(file, staged)
    changes.push({ file, updated })
  }

  for (const { file, updated } of changes) {
    fs.writeFileSync(file, updated)
  }
  if (changes.length) {
    git(["add", "--", ...changes.map(({ file }) => file)])
    for (const { file } of changes) {
      console.log(`Renumbered footnotes: ${file}`)
    }
  }
}

try {
  main()
} catch (error) {
  console.error(`Footnote pre-commit hook: ${error.message}`)
  process.exitCode = 1
}
