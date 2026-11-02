const { html } = require("../lib/html")
const { byPopularity } = require("../lib/posts")
const Bio = require("../components/bio")
const Layout = require("../components/layout")
const PostMeta = require("../components/post-meta")

exports.data = {
  pagination: { data: "collections.posts", size: 15, alias: "posts" },
  permalink: ({ pagination }) =>
    pagination.pageNumber === 0 ? "/" : `/page/${pagination.pageNumber + 1}/`,
}

exports.render = ({ page, posts, pagination, collections }) => {
  const currentPage = pagination.pageNumber + 1
  const numPages = pagination.pages.length
  const popularPosts = byPopularity(
    collections.posts.filter(post => post.data.popular === true)
  ).slice(0, 3)

  return Layout(
    { url: page.url, title: currentPage === 1 ? "All posts" : `Page ${currentPage}` },
    html`<footer>${Bio()}</footer>
<hr style="margin-bottom:1.75rem"/>
${currentPage === 1 && html`<section><h2>popular</h2>${popularPosts.map(
      post => html`<article><h3><a style="box-shadow:none" href="${post.url}">${post.data.title}</a></h3></article>`
    )}<p style="margin-top:0.875rem"><a style="box-shadow:none" href="/popular">View all&nbsp;→</a></p></section>
<hr style="margin-bottom:1.75rem"/>`}
<section>${currentPage === 1 && html`<h2>recent</h2>`}${posts.map(
      post => html`<article><header><h3 style="margin-bottom:0.4375rem"><a style="box-shadow:none" href="${post.url}">${post.data.title || post.url}</a></h3></header>${PostMeta(post)}</article>`
    )}</section>
<nav style="margin-top:1.75rem">${
      currentPage > 1 &&
      html`<a rel="prev" href="${currentPage === 2 ? "/" : `/page/${currentPage - 1}`}">← Newer Posts</a>`
    }${
      currentPage < numPages &&
      html`<span style="float:right"><a rel="next" href="/page/${currentPage + 1}">Older Posts →</a></span>`
    }</nav>`
  )
}
