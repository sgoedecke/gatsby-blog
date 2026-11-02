const { html } = require("../lib/html")
const { tagCounts, tagUrl } = require("../lib/posts")
const BackToBlog = require("../components/back-to-blog")
const Bio = require("../components/bio")
const Layout = require("../components/layout")

const MIN_FONT_SIZE = 0.9
const MAX_FONT_SIZE = 2.1

exports.data = { permalink: "/tags/" }

exports.render = ({ page, collections }) => {
  const tags = tagCounts(collections.posts)
  const counts = tags.map(({ count }) => count)
  const minCount = Math.min(...counts)
  const maxCount = Math.max(...counts)
  const fontSize = count =>
    minCount === maxCount
      ? (MIN_FONT_SIZE + MAX_FONT_SIZE) / 2
      : MIN_FONT_SIZE +
        ((count - minCount) / (maxCount - minCount)) *
          (MAX_FONT_SIZE - MIN_FONT_SIZE)

  return Layout(
    { url: page.url, title: "Tags" },
    html`<footer>${Bio()}</footer>
<hr style="margin-bottom:1.75rem"/>
<div class="tag-cloud" aria-label="Tag cloud">${tags.map(
      ({ tag, count }) =>
        html`<a class="tag-cloud__link" style="font-size:${fontSize(count)}rem" href="${tagUrl(tag)}">${tag}<span class="tag-cloud__count">${count}</span></a>`
    )}</div>
${BackToBlog()}`
  )
}
