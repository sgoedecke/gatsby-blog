const assert = require("node:assert/strict")
const { test } = require("node:test")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const { execFileSync, spawnSync } = require("node:child_process")
const matter = require("gray-matter")
const { introducesPopularityLink } = require("./introduced-popularity-links")

const root = path.resolve(__dirname, "../..")
const youtube = "https://www.youtube.com/watch?v=example"
const post = (text = "") =>
  `---\ntitle: Example\ndate: 2026-09-10\n---\n\n${text}\n`

function repository(t) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "blog-hooks-"))
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }))
  const env = { ...process.env }
  // Tests must not inherit the real commit's alternate index or worktree.
  for (const key of Object.keys(env)) {
    if (key.startsWith("GIT_")) delete env[key]
  }
  const git = (...args) =>
    execFileSync("git", args, { cwd, env, encoding: "utf8" })
  git("init", "--quiet")
  git("config", "user.name", "Hook test")
  git("config", "user.email", "hook@example.com")
  git("config", "core.hooksPath", path.join(root, ".githooks"))
  fs.symlinkSync(path.join(root, "scripts"), path.join(cwd, "scripts"), "dir")
  const write = (file, text) => {
    fs.mkdirSync(path.dirname(path.join(cwd, file)), { recursive: true })
    fs.writeFileSync(path.join(cwd, file), text)
  }
  const read = file => fs.readFileSync(path.join(cwd, file), "utf8")
  const hook = (name, extraEnv = {}) =>
    spawnSync(process.execPath, [path.join(root, "scripts", name)], {
      cwd,
      env: { ...env, ...extraEnv },
      encoding: "utf8",
    })
  return { cwd, git, write, read, hook }
}

test("recognizes new HN, Lobsters and YouTube URLs, not other services", () => {
  for (const url of [
    "https://news.ycombinator.com/item?id=123",
    "https://lobste.rs/s/abc123/title",
    youtube,
    "https://youtu.be/example",
    "https://m.youtube.com/shorts/example",
  ]) {
    assert.equal(introducesPopularityLink("", `[link](${url})`), true, url)
    assert.equal(introducesPopularityLink(url, `Moved [link](${url})`), false)
    assert.equal(introducesPopularityLink(url, ""), false)
  }
  for (const url of [
    "https://reddit.com/r/programming/comments/abc123",
    "https://news.ycombinator.com/user?id=someone",
    "https://youtube.com/@someone",
    "https://youtube.com.example.org/watch?v=example",
  ]) {
    assert.equal(introducesPopularityLink("", url), false, url)
  }
})

test("footnote hook handles initial commits and stages only touched Markdown", t => {
  const { git, write, read, hook } = repository(t)
  const file = "posts/a [draft]\nexample.MD"
  const source = "Text[^9].\n\n[^9]: Note\n"
  write(file, source)
  write("untouched.md", source)
  write("example.txt", source)
  git("add", "--", file, "example.txt")
  const result = hook("renumber-footnotes.js")
  assert.equal(result.status, 0, result.stderr)
  assert.equal(git("show", `:${file}`), source.replaceAll("[^9]", "[^1]"))
  assert.equal(read(file), git("show", `:${file}`))
  assert.equal(read("untouched.md"), source)
  assert.equal(read("example.txt"), source)
})

test("footnote hook refuses partial staging before modifying any files", t => {
  const { git, write, read, hook } = repository(t)
  const source = "Text[^9].\n\n[^9]: Note\n"
  write("a.md", source)
  write("b.md", source)
  git("add", ".")
  write("b.md", source + "\nUnstaged\n")
  const result = hook("renumber-footnotes.js")
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /unstaged changes/)
  assert.equal(read("a.md"), source)
  assert.equal(git("show", ":b.md"), source)
})

test("both steps run on a real commit and update only the affected post", t => {
  const { git, write, read } = repository(t)
  const file = "content/blog/example/index.md"
  const other = "content/blog/other/index.md"
  write(file, post("Text."))
  write(other, post("Other."))
  git("add", "--", file, other)
  git("commit", "--quiet", "-m", "Initial")
  const untouched = post(`edit: I discussed it on [YouTube](${youtube}).`)
  write(other, untouched)
  write(
    file,
    post(
      `edit: I discussed it on [YouTube](${youtube}).\n\nText[^8].\n\n[^8]: Note`
    )
  )
  git("add", "--", file)
  git("commit", "--quiet", "-m", "Add discussion")
  const committed = git("show", `HEAD:${file}`)
  assert.deepEqual(matter(committed).data.popularity.youtube.urls, [youtube])
  assert.match(committed, /Text\[\^1\]/)
  assert.equal(read(file), committed)
  assert.equal(read(other), untouched)
  assert.equal(git("show", `HEAD:${other}`), post("Other."))
})

test("popularity hook refuses unstaged edits in affected posts", t => {
  const { git, write, read, hook } = repository(t)
  const file = "content/blog/example/index.md"
  const source = post(`edit: I discussed it on [YouTube](${youtube}).`)
  write(file, source)
  git("add", "--", file)
  write(file, source + "\nUnstaged\n")
  const result = hook("update-popularity-on-commit.js")
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /unstaged changes/)
  assert.equal(git("show", `:${file}`), source)
  assert.equal(read(file), source + "\nUnstaged\n")
})

test("moving a link or renaming a post does not run the updater", t => {
  const { git, write, read } = repository(t)
  const file = "content/blog/example/index.md"
  write(file, post(`Source [video](${youtube}).`))
  git("add", "--", file)
  git("commit", "--quiet", "-m", "Initial")
  const moved = post(`edit: I discussed it on [YouTube](${youtube}).`)
  write(file, moved)
  git("add", "--", file)
  git("commit", "--quiet", "-m", "Move link")
  assert.equal(read(file), moved)
  const renamed = "content/blog/new-name/index.md"
  write(renamed, moved)
  git("rm", "--quiet", "--", file)
  git("add", "--", renamed)
  git("commit", "--quiet", "-m", "Rename post")
  assert.equal(read(renamed), moved)
})

test("deleted Markdown and staged symlinks are not rewritten", t => {
  const { cwd, git, write, read, hook } = repository(t)
  write("old.md", "Old text")
  git("add", "old.md")
  git("commit", "--quiet", "-m", "Initial")
  git("rm", "--quiet", "old.md")
  const source = "Text[^9].\n\n[^9]: Note\n"
  write("target.md", source)
  fs.symlinkSync("target.md", path.join(cwd, "link.md"))
  git("add", "link.md")
  const result = hook("renumber-footnotes.js")
  assert.equal(result.status, 0, result.stderr)
  assert.equal(read("target.md"), source)
  assert.equal(git("show", ":link.md"), "target.md")
})

test("popularity hook propagates API failures without changing the post", t => {
  const { cwd, git, write, read, hook } = repository(t)
  const file = "content/blog/example/index.md"
  const source = post(
    "edit: this post was discussed on [HN](https://news.ycombinator.com/item?id=123)."
  )
  write(file, source)
  git("add", "--", file)
  write(
    "offline.cjs",
    `
    const { EventEmitter } = require("node:events")
    require("node:https").get = () => {
      const request = new EventEmitter()
      request.setTimeout = () => {}
      process.nextTick(() => request.emit("error", new Error("offline test")))
      return request
    }
  `
  )
  const result = hook("update-popularity-on-commit.js", {
    NODE_OPTIONS: `--require=${path.join(cwd, "offline.cjs")}`,
  })
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /offline test/)
  assert.equal(read(file), source)
  assert.equal(git("show", `:${file}`), source)
})
