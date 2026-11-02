// A tiny JSX substitute: `html` is a tagged template that escapes every
// interpolated value unless it is itself `html` output or wrapped in `raw()`.
// Arrays are joined and null, undefined, and false render as nothing, so
// `${cond && html`...`}` and `${items.map(...)}` work as they do in JSX.

class SafeHtml {
  constructor(value) {
    this.value = value
  }

  toString() {
    return this.value
  }
}

const escapeHtml = value =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const render = value => {
  if (value === null || value === undefined || value === false) return ""
  if (Array.isArray(value)) return value.map(render).join("")
  if (value instanceof SafeHtml) return value.value
  return escapeHtml(value)
}

const raw = value => new SafeHtml(String(value ?? ""))

const html = (strings, ...values) =>
  raw(strings.reduce((out, string, i) => out + render(values[i - 1]) + string))

module.exports = { html, raw, escapeHtml }
