const assert = require("node:assert/strict")
const { test } = require("node:test")
const { renumberFootnotes } = require("./renumber-footnotes")

test("numbers first references, updating repeated references and definitions", () => {
  assert.equal(
    renumberFootnotes(
      "First[^9], next[^2], again[^9].\n\n[^2]: Two\n[^9]: Nine\n"
    ),
    "First[^1], next[^2], again[^1].\n\n[^2]: Two\n[^1]: Nine\n"
  )
})

test("uses reference order even when definitions come first", () => {
  assert.equal(
    renumberFootnotes("[^2]: Two\n[^9]: Nine\n\nFirst[^9], next[^2].\n"),
    "[^2]: Two\n[^1]: Nine\n\nFirst[^1], next[^2].\n"
  )
})

test("supports named labels, case-insensitive matching and orphan definitions", () => {
  assert.equal(
    renumberFootnotes(
      "First[^Name], next[^1].\n\n[^name]: Named\n[^3]: Orphan\n"
    ),
    "First[^1], next[^2].\n\n[^1]: Named\n[^3]: Orphan\n"
  )
  assert.equal(
    renumberFootnotes("Text[^9].\n\n[^1]: Unused\n[^9]: Used\n"),
    "Text[^1].\n\n[^2]: Unused\n[^1]: Used\n"
  )
})

test("preserves formatting, CRLF, Unicode and multiline definitions", () => {
  const source =
    "Text café[^99].\r\n\r\n[^99]: First\r\n\r\n    Second *line*.\r\n"
  const result = renumberFootnotes(source)
  assert.equal(result, source.replaceAll("[^99]", "[^1]"))
  assert.equal(renumberFootnotes(result), result)
})

test("ignores code, escaped markers, HTML blocks and frontmatter", () => {
  const source = [
    "---",
    'title: "Example[^77]"',
    "---",
    "",
    "```md",
    "[^8]: Code",
    "Example[^8]",
    "```",
    "",
    "~~~",
    "Example[^7]",
    "~~~",
    "",
    "    Indented[^6]",
    "",
    "<!-- Example[^5] -->",
    "",
    "<div>",
    "Example[^4]",
    "</div>",
    "",
    "`Example[^3]` and \\[^2]. Real[^99].",
    "",
    "[^99]: Note",
    "",
  ].join("\n")
  assert.equal(renumberFootnotes(source), source.replaceAll("[^99]", "[^1]"))
})
