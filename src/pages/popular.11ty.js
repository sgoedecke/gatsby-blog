const { html } = require("../lib/html")
const { byPopularity } = require("../lib/posts")
const BackToBlog = require("../components/back-to-blog")
const Bio = require("../components/bio")
const Layout = require("../components/layout")
const PostMeta = require("../components/post-meta")

exports.data = { permalink: "/popular/" }

exports.render = ({ page, collections }) => {
  const posts = byPopularity(
    collections.posts.filter(post => post.data.popular === true)
  )
  return Layout(
    { url: page.url, title: "Popular posts" },
    html`<footer>${Bio()}</footer>
<hr style="margin-bottom:1.75rem"/>
<h2 style="margin-bottom:1.75rem">popular</h2>
${posts.map(
  post => html`<article><h3 style="margin-bottom:0.4375rem"><a style="box-shadow:none" href="${post.url}">${post.data.title}</a></h3>${PostMeta(post)}</article>`
)}
${BackToBlog()}`
  )
}
