const { execFileSync } = require("node:child_process")
const fs = require("node:fs")

const git = args =>
  execFileSync("git", ["--literal-pathspecs", ...args], { encoding: "utf8" })

function stagedMarkdown() {
  const entries = git([
    "diff",
    "--cached",
    "--name-status",
    "--diff-filter=ACMR",
    "--find-renames",
    "-z",
    "--",
  ]).split("\0")
  const files = []
  for (let index = 0; index < entries.length - 1; ) {
    const status = entries[index++]
    const previous = entries[index++]
    const file = /^[RC]/.test(status) ? entries[index++] : previous
    if (!/\.(md|markdown)$/i.test(file)) continue
    const entry = git(["ls-files", "--stage", "-z", "--", file])
    if (!/^100(?:644|755) /.test(entry)) continue
    files.push({
      file,
      previous: status === "A" ? null : previous,
      staged: git(["show", `:${file}`]),
    })
  }
  return files
}

function requireFullyStaged(file, staged) {
  if (
    !fs.existsSync(file) ||
    !fs.lstatSync(file).isFile() ||
    fs.readFileSync(file, "utf8") !== staged
  ) {
    throw new Error(
      `${file} needs a hook update but has unstaged changes. ` +
        "Stage or stash those changes and retry the commit."
    )
  }
}

module.exports = { git, stagedMarkdown, requireFullyStaged }
