// Markdown rendering for blog posts. This reproduces what the old Gatsby remark
// pipeline produced, so existing anchors, footnote links, and styles keep
// working: heading permalinks, `fn-1`/`fnref-1` footnotes, Prism highlighting,
// SmartyPants-style punctuation, spaced-hyphen em-dashes, and post-relative
// asset URLs.

const fs = require("node:fs")
const path = require("node:path")
const markdownIt = require("markdown-it")
const footnote = require("markdown-it-footnote")
const GithubSlugger = require("github-slugger")
const Prism = require("prismjs")
const loadLanguages = require("prismjs/components/")
const emDashes = require("./markdown-it-em-dashes")

const { escapeHtml } = require("./html")
const { POST_ASSET_EXTENSIONS } = require("./posts")

const ANCHOR_ICON =
  '<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'
const ANCHORED_HEADINGS = new Set(["h2", "h3", "h4", "h5", "h6"])
const RESIZABLE_IMAGE = /\.(png|jpe?g|webp)$/i
const POST_ASSET = new RegExp(`\\.(${POST_ASSET_EXTENSIONS.join("|")})$`, "i")

const safeDecode = uri => {
  try {
    return decodeURI(uri)
  } catch {
    return null
  }
}

// Give h2-h6 a GitHub-style id and a trailing permalink. Slugs come from the
// heading's source text (before smart quotes and dashes), as Gatsby's did.
function headingAnchors(md) {
  md.core.ruler.after("inline", "heading_ids", state => {
    const slugger = new GithubSlugger()
    state.tokens.forEach((token, i) => {
      if (token.type !== "heading_open" || !ANCHORED_HEADINGS.has(token.tag)) {
        return
      }
      const text = state.tokens[i + 1].children
        .filter(child => child.type === "text" || child.type === "code_inline")
        .map(child => child.content)
        .join("")
      token.attrSet("id", slugger.slug(text))
      token.attrSet("style", "position:relative;")
    })
  })

  const defaultClose = (tokens, idx, options, env, self) =>
    self.renderToken(tokens, idx, options)
  md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
    const open = tokens[idx - 2]
    const id = open.attrGet("id")
    const close = defaultClose(tokens, idx, options, env, self)
    if (!id) return close
    const label = `${id.split("-").join(" ")} permalink`
    return (
      `<a href="#${escapeHtml(id)}" aria-label="${escapeHtml(label)}" ` +
      `class="heading-anchor after">${ANCHOR_ICON}</a>${close}`
    )
  }
}

// Footnotes keep Gatsby's markup: `fn-<label>` ids, the label as the visible
// marker, and the separator inside `.footnotes` so sidenotes can hide it all.
function footnoteMarkup(md) {
  const rules = md.renderer.rules
  const name = tokens => tokens.meta.label ?? String(tokens.meta.id + 1)
  const suffix = token => (token.meta.subId > 0 ? `:${token.meta.subId}` : "")

  rules.footnote_ref = (tokens, idx) => {
    const token = tokens[idx]
    const id = escapeHtml(name(token))
    return (
      `<sup id="fnref-${id}${suffix(token)}">` +
      `<a href="#fn-${id}" class="footnote-ref">${id}</a></sup>`
    )
  }
  rules.footnote_block_open = () => '<div class="footnotes">\n<hr>\n<ol>\n'
  rules.footnote_block_close = () => "</ol>\n</div>\n"
  rules.footnote_open = (tokens, idx) =>
    `<li id="fn-${escapeHtml(name(tokens[idx]))}">\n`
  // Like Gatsby, a single back link goes after the note's last paragraph
  // rather than inside it.
  rules.footnote_close = (tokens, idx, options, env) => {
    const backref = env.footnoteBackref || ""
    env.footnoteBackref = ""
    return `${backref}</li>\n`
  }
  rules.footnote_anchor = (tokens, idx, options, env) => {
    const token = tokens[idx]
    if (token.meta.subId === 0) {
      env.footnoteBackref = `<a href="#fnref-${escapeHtml(name(token))}" class="footnote-backref">↩</a>\n`
    }
    return ""
  }
}

// Footnotes that are defined but never referenced still get listed, as they
// were with Gatsby, rather than silently dropped.
function orphanFootnotes(md) {
  md.core.ruler.before("footnote_tail", "orphan_footnotes", state => {
    const footnotes = state.env.footnotes
    if (!footnotes || !footnotes.refs) return
    footnotes.list = footnotes.list || []
    for (const [key, id] of Object.entries(footnotes.refs)) {
      if (id >= 0) continue
      footnotes.refs[key] = footnotes.list.length
      footnotes.list.push({ label: key.slice(1), count: 0 })
    }
  })
}

function highlight(code, language) {
  const lang = (language || "text").toLowerCase()
  if (!Prism.languages[lang] && lang !== "text") {
    loadLanguages.silent = true
    loadLanguages([lang])
  }
  const grammar = Prism.languages[lang]
  const body = grammar
    ? Prism.highlight(code, grammar, lang)
    : escapeHtml(code)
  const cls = `language-${escapeHtml(lang)}`
  return `<pre class="${cls}"><code class="${cls}">${body.replace(/^\n+|\n$/g, "")}</code></pre>\n`
}

function codeMarkup(md) {
  md.renderer.rules.code_inline = (tokens, idx) =>
    `<code class="language-text">${escapeHtml(tokens[idx].content)}</code>`
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const language = token.info.trim().split(/\s+/)[0]
    return highlight(token.content, language)
  }
  md.renderer.rules.code_block = (tokens, idx) =>
    highlight(tokens[idx].content, "text")
}

// Files next to a post (images, videos) are copied to the post's URL. Rewrite
// links to them as root-relative URLs so they work from feeds and from a URL
// without a trailing slash. Images link to their full-size original.
function postAssets(md) {
  // `/name.png` counts too: one post links its image that way.
  const resolve = (url, env) => {
    const page = env && env.page
    if (!page || !url || /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) return null
    const relative = url.replace(/^\.?\//, "")
    const file = safeDecode(relative.split(/[?#]/)[0])
    if (!file || !POST_ASSET.test(file)) return null
    if (!fs.existsSync(path.join(path.dirname(page.inputPath), file))) return null
    return page.url + relative
  }

  const rules = md.renderer.rules
  const defaultLink = (tokens, idx, options, env, self) =>
    self.renderToken(tokens, idx, options)
  rules.link_open = (tokens, idx, options, env, self) => {
    const url = resolve(tokens[idx].attrGet("href"), env)
    if (url) tokens[idx].attrSet("href", url)
    return defaultLink(tokens, idx, options, env, self)
  }

  rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const src = resolve(token.attrGet("src"), env) || token.attrGet("src")
    const alt = self.renderInlineAsText(token.children, options, env)
    if (!RESIZABLE_IMAGE.test(src) || /^[a-z]+:/i.test(src)) {
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">`
    }
    const title = token.attrGet("title") || alt
    return (
      `<a class="post-image" href="${escapeHtml(src)}" target="_blank" rel="noopener">` +
      `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" title="${escapeHtml(title)}" loading="lazy" decoding="async">` +
      `</a>`
    )
  }

  const rewriteHtml = (content, env) =>
    content.replace(
      /(\s(?:src|href)=")([^"]*)(")/g,
      (match, before, url, after) => {
        const resolved = resolve(url, env)
        return resolved ? before + resolved + after : match
      }
    )
  const defaultHtmlBlock = rules.html_block
  const defaultHtmlInline = rules.html_inline
  rules.html_block = (tokens, idx, options, env, self) =>
    rewriteHtml(defaultHtmlBlock(tokens, idx, options, env, self), env)
  rules.html_inline = (tokens, idx, options, env, self) =>
    rewriteHtml(defaultHtmlInline(tokens, idx, options, env, self), env)
}

// SmartyPants (as gatsby-remark-smartypants configured it) turns `--` into an
// em-dash and `...` into an ellipsis, but leaves (c), +-, etc. alone, so use
// markdown-it's smart quotes with our own replacements.
function smartyPantsPunctuation(md) {
  md.disable("replacements")
  md.core.ruler.after("smartquotes", "smartypants_punctuation", state => {
    state.tokens
      .filter(token => token.type === "inline")
      .forEach(token => {
        let insideAutolink = 0
        token.children.forEach(child => {
          if (child.type === "link_open" && child.markup === "linkify") {
            insideAutolink++
          } else if (child.type === "link_close" && child.markup === "linkify") {
            insideAutolink--
          } else if (child.type === "text" && !insideAutolink) {
            child.content = child.content
              .replace(/-{2,3}/g, "\u2014")
              .replace(/\.\.\.|\. \. \./g, "\u2026")
          }
        })
      })
  })
}

const markdown = markdownIt({ html: true, linkify: true, typographer: true })
  .use(footnote)
  .use(footnoteMarkup)
  .use(orphanFootnotes)
  .use(headingAnchors)
  .use(codeMarkup)
  .use(postAssets)
  .use(smartyPantsPunctuation)
  .use(emDashes)

// ~~text~~ is a deletion, as Gatsby rendered it.
markdown.renderer.rules.s_open = () => "<del>"
markdown.renderer.rules.s_close = () => "</del>"
markdown.linkify.set({ fuzzyLink: false, fuzzyEmail: false })

module.exports = markdown
