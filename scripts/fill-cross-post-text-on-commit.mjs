import { writeFileSync } from "node:fs"
import { createRequire } from "node:module"

import { fillCrossPostText } from "./cross-post/fill.mjs"

const require = createRequire(import.meta.url)
const { git, stagedMarkdown, requireFullyStaged } = require("./staged-markdown")

function main() {
  process.chdir(git(["rev-parse", "--show-toplevel"]).trimEnd())
  const changes = []
  for (const { file, previous, staged } of stagedMarkdown()) {
    if (!/^content\/(blog|drafts)\/[^/]+\/index\.md$/.test(file)) continue
    const before = previous === null ? null : git(["show", `HEAD:${previous}`])
    const updated = fillCrossPostText(staged, before)
    if (updated === staged) continue
    requireFullyStaged(file, staged)
    changes.push({ file, updated })
  }

  for (const { file, updated } of changes) {
    writeFileSync(file, updated)
  }
  if (changes.length) {
    git(["add", "--", ...changes.map(({ file }) => file)])
    for (const { file } of changes) {
      console.log(`Filled in cross-post text: ${file}`)
    }
  }
}

try {
  main()
} catch (error) {
  console.error(`Cross-post text pre-commit hook: ${error.message}`)
  process.exitCode = 1
}
