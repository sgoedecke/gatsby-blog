// The RSS feeds (/rss.xml, /feed.xml and /atom.xml all get the same RSS 2.0
// document, as they did under gatsby-plugin-feed).

const { escapeHtml } = require("./html")
const { byDate } = require("./posts")

const FEED_LENGTH = 30

const cdata = text => `<![CDATA[${String(text).replace(/]]>/g, "]]]]><![CDATA[>")}]]>`

// Email clients do not reliably support links within the message, so point
// footnote links and backlinks at the post itself.
const absoluteFootnoteLinks = (html, postUrl) =>
  html.replace(
    /(<a\b[^>]*\shref=")(#fn(?:ref)?-[^"]+)(")/g,
    (_, before, fragment, after) => before + postUrl + fragment + after
  )

const feedItem = (post, siteUrl) => {
  const url = new URL(post.url, siteUrl).href
  return {
    title: post.data.title,
    url,
    guid: url,
    date: new Date(post.data.date).toUTCString(),
    html: absoluteFootnoteLinks(post.content, url),
  }
}

const renderFeed = ({ posts, site, buildDate = new Date() }) => {
  const items = byDate(posts)
    .slice(0, FEED_LENGTH)
    .map(post => feedItem(post, site.siteUrl))
  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">` +
    `<channel><title>${cdata(site.feedTitle)}</title>` +
    `<description>${cdata(site.description)}</description>` +
    `<link>${escapeHtml(site.siteUrl)}</link>` +
    `<generator>Eleventy</generator>` +
    `<lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>` +
    items
      .map(
        item =>
          `<item><title>${cdata(item.title)}</title>` +
          `<link>${escapeHtml(item.url)}</link>` +
          `<guid isPermaLink="false">${escapeHtml(item.guid)}</guid>` +
          `<pubDate>${item.date}</pubDate>` +
          `<content:encoded>${escapeHtml(item.html)}</content:encoded></item>`
      )
      .join("") +
    `</channel></rss>`
  )
}

module.exports = { absoluteFootnoteLinks, feedItem, renderFeed }
