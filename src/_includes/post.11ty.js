const { html, raw } = require("../lib/html")
const { excerpt, relatedPreview } = require("../lib/posts")
const Bio = require("../components/bio")
const Layout = require("../components/layout")
const PostMeta = require("../components/post-meta")

module.exports = function ({ content, page, title, description, collections }) {
  const post = collections.posts.find(item => item.url === page.url)
  const preview = relatedPreview(post, collections.posts)
  const hasFootnotes = content.includes(`class="footnote-ref"`)
  const postUrl = `https://www.seangoedecke.com${page.url}`
  const hackerNewsSubmitUrl =
    `https://news.ycombinator.com/submitlink?` +
    `u=${encodeURIComponent(postUrl)}&t=${encodeURIComponent(title)}`

  return Layout(
    {
      url: page.url,
      title,
      description: description || excerpt(content, 160),
      headerMeta: PostMeta(post),
      className: hasFootnotes && "has-footnotes",
      scripts: hasFootnotes ? ["/sidenotes.js"] : [],
    },
    html`<article>
<header><h1 style="margin-top:1.75rem;margin-bottom:20px">${title}</h1></header>
<div class="post-body"><section>${raw(content)}</section></div>
<hr style="margin-top:2.625rem;margin-bottom:2.625rem"/>
<p>If you liked this post, consider <a href="https://buttondown.com/seangoedecke" target="_blank">subscribing</a> to email updates about my new posts, or <a href="${hackerNewsSubmitUrl}" target="_blank">sharing it on Hacker News</a>.</p>
${preview && html`<p>Here's a preview of a related post that shares tags with this one.</p>
<blockquote style="border-left:4px solid #d9d9d9;margin-top:0.875rem;margin-bottom:0.875rem;padding-left:0.875rem"><p style="font-weight:600;margin-bottom:0.4375rem;margin-top:0">${preview.title}</p><div>${raw(preview.snippetHtml)}</div></blockquote>`}
<hr style="margin-bottom:1.75rem"/>
<footer>${Bio()}</footer>
</article>`
  )
}
