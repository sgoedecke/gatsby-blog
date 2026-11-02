const { html } = require("../lib/html")
const BackToBlog = require("../components/back-to-blog")
const Bio = require("../components/bio")
const Layout = require("../components/layout")

const LULU_URL =
  "https://www.lulu.com/shop/sean-goedecke/software-engineering-after-the-vibe-shift/paperback/product-jew4ver.html?q=Sean+Goedecke&page=1&pageSize=4"

exports.data = { permalink: "/book/" }

exports.render = ({ page }) =>
  Layout(
    { url: page.url, title: "Book" },
    html`<footer>${Bio()}</footer>
<hr style="margin-bottom:1.75rem"/>
<h2 style="margin-bottom:1.75rem">book</h2>

<p>I've written up my thoughts on software engineering as a <a href="${LULU_URL}" target="_blank">book</a>, called "Software Engineering after the Vibe Shift". If you've read all my blog posts, there won't be much new in there - it's more of a "pull out the most important points into a coherent structure" thing.</p>

<p>I've done this at the request of a few people who prefer to read books than blogs, and I'm hoping it'll be a good way to reach a wider audience. The <a href="${LULU_URL}" target="_blank">print version</a> is priced at cost. If you'd like a copy and can't afford to pay for it, the raw <a href="https://github.com/sgoedecke/gatsby-blog/blob/master/content/book/book.pdf" target="_blank">PDF</a> is hosted in the same GitHub repo that hosts this blog. If you read it and liked it, please leave a review on the <a href="${LULU_URL}" target="_blank">listing page</a>.</p>

<p><a href="${LULU_URL}" target="_blank">You can buy it here!</a></p>

${BackToBlog()}`
  )
