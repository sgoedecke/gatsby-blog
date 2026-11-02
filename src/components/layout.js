const { html, raw } = require("../lib/html")
const site = require("../_data/site")

const SearchBox = () => html`<div class="search-container"><form class="site-search" action="https://www.google.com/search" target="_blank" rel="noopener"><label for="site-search-input" class="sr-only">Search seangoedecke.com</label><input type="text" id="site-search-input" name="q" placeholder="Search posts"/><input type="hidden" name="as_sitesearch" value="seangoedecke.com"/><button type="submit">Search</button></form></div>
<script>
document.querySelector(".site-search").addEventListener("submit", event => {
  event.preventDefault()
  const query = event.target.q.value.trim()
  const siteQuery = query ? "inurl:seangoedecke.com " + query : "inurl:seangoedecke.com"
  window.open("https://www.google.com/search?q=" + encodeURIComponent(siteQuery), "_blank", "noopener,noreferrer")
})
</script>`

// The page shell shared by every page. `title` and `description` fill the
// <head>; `headerMeta` sits beside the site title (used for post dates/tags).
const Layout = (
  { url, title, description, headerMeta, className, scripts = [] },
  children
) => {
  const metaDescription = description || site.description
  const isHome = url === "/"
  const homeLink = html`<a class="home-link" href="/">${site.title}</a>`

  return String(html`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
<title>${title}</title>
<meta property="og:title" content="${title}"/>
<meta property="og:type" content="website"/>
<meta property="og:description" content="${metaDescription}"/>
<meta name="description" content="${metaDescription}"/>
<meta name="theme-color" content="#663399"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96"/>
<link rel="shortcut icon" href="/favicon.ico"/>
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180"/>
<link rel="manifest" href="/site.webmanifest"/>
${site.feeds.map(
  feed =>
    html`<link rel="alternate" type="application/rss+xml" title="${site.feedTitle}" href="${feed}"/>
`
)}<link rel="stylesheet" href="/styles/typography.css"/>
<link rel="stylesheet" href="/styles/global.css"/>
<link rel="stylesheet" href="/styles/prism-tomorrow.css"/>
<script defer src="https://sg-analytics.pikapod.net/script.js" data-website-id="f535647a-f97e-42ba-a2eb-4e9583984266"></script>
${scripts.map(src => html`<script defer src="${src}"></script>
`)}</head>
<body>
<div class="${["site", className].filter(Boolean).join(" ")}">
<header class="site-header">${
    isHome
      ? html`<h1 class="site-title">${homeLink}</h1>`
      : html`<h3 class="site-title-small">${homeLink}</h3>`
  }${headerMeta && html`<div class="post-header-meta">${headerMeta}</div>`}</header>
<main>${raw(children)}</main>
${SearchBox()}
</div>
</body>
</html>
`)
}

module.exports = Layout
