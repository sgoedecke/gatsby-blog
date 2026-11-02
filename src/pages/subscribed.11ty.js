const { html } = require("../lib/html")
const BackToBlog = require("../components/back-to-blog")
const Layout = require("../components/layout")

exports.data = { permalink: "/subscribed/" }

exports.render = ({ page }) =>
  Layout(
    { url: page.url, title: "Subscribed" },
    html`<h2 style="margin-bottom:1.75rem">subscribing</h2>

<p>Thanks for subscribing! You should get a confirmation email in your inbox. You'll have to click the link in that email before you'll be properly subscribed.</p>

<p>If you don't see the confirmation email, check your spam folder.</p>

${BackToBlog()}`
  )
