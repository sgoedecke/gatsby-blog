const { html } = require("../lib/html")
const Layout = require("../components/layout")

// Netlify serves /404.html for any path that doesn't exist.
exports.data = { permalink: "/404.html" }

exports.render = ({ page }) =>
  Layout(
    { url: page.url, title: "404: Not Found" },
    html`<h1>Not Found</h1>
<p>Page not found, sorry!</p>`
  )
