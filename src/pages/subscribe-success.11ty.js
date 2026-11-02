const { html } = require("../lib/html")
const BackToBlog = require("../components/back-to-blog")
const Layout = require("../components/layout")
const RecommendedPosts = require("../components/recommended-posts")

exports.data = { permalink: "/subscribe-success/" }

exports.render = ({ page }) =>
  Layout(
    { url: page.url, title: "Subscribed" },
    html`<h2 style="margin-bottom:1.75rem">subscribed</h2>

<p>Thank you for subscribing! I hope you enjoy my posts. Please do reply to the emails if you have thoughts, I love getting feedback from subscribers. And if you haven't seen them already, you might be interested in these popular posts of mine:</p>

${RecommendedPosts()}

${BackToBlog()}`
  )
