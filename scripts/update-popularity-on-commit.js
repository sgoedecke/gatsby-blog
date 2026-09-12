const { execFileSync } = require("node:child_process")
const path = require("node:path")
const { git, stagedMarkdown, requireFullyStaged } = require("./staged-markdown")
const {
  introducesPopularityLink,
} = require("../src/utils/introduced-popularity-links")

function main() {
  process.chdir(git(["rev-parse", "--show-toplevel"]).trimEnd())
  const files = stagedMarkdown().filter(({ file, previous, staged }) => {
    if (!/^content\/blog\/.+\/index\.md$/.test(file)) return false
    const before = previous === null ? "" : git(["show", `HEAD:${previous}`])
    return introducesPopularityLink(before, staged)
  })
  if (!files.length) return
  for (const { file, staged } of files) {
    requireFullyStaged(file, staged)
  }

  execFileSync(
    process.execPath,
    [
      path.join(__dirname, "../update-popularity.js"),
      "--files",
      ...files.map(({ file }) => file),
    ],
    { stdio: "inherit" }
  )
  git(["add", "--", ...files.map(({ file }) => file)])
}

try {
  main()
} catch (error) {
  console.error(`Popularity pre-commit hook: ${error.message}`)
  process.exitCode = 1
}
