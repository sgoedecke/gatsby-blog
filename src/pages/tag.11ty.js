const { html } = require("../lib/html")
const { byDate, tagCounts, tagUrl } = require("../lib/posts")
const Layout = require("../components/layout")

exports.data = {
  pagination: {
    data: "collections.posts",
    size: 1,
    alias: "tag",
    before: posts => tagCounts(posts).map(({ tag }) => tag),
  },
  permalink: ({ tag }) => tagUrl(tag),
}

exports.render = ({ page, tag, collections }) => {
  const posts = byDate(
    collections.posts.filter(post => (post.data.tags || []).includes(tag))
  )
  return Layout(
    { url: page.url, title: `Posts tagged "${tag}"` },
    html`<h2>Posts tagged with "${tag}"</h2>
<ul>${posts.map(post => html`<li><a href="${post.url}">${post.data.title}</a></li>`)}</ul>
<a href="/">← Back to blog</a>`
  )
}
