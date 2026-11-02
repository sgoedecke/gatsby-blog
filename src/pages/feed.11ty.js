const { renderFeed } = require("../lib/feed")

exports.data = {
  pagination: { data: "site.feeds", size: 1, alias: "feed" },
  permalink: ({ feed }) => feed,
  eleventyExcludeFromCollections: true,
}

exports.render = ({ collections, site }) =>
  renderFeed({ posts: collections.posts, site })
