const { platformForUrl } = require("./discussion-links")

function popularityUrls(text) {
  const urls = new Set()
  const pattern = /https?:\/\/(?:news\.ycombinator\.com|lobste\.rs|(?:(?:www|m)\.)?youtube\.com|youtu\.be)\/[^\s<>"'`)\]]+/gi
  for (const [match] of text.matchAll(pattern)) {
    const url = new URL(match.replace(/[.,;:!?]+$/, ""))
    if (["hn", "lobsters", "youtube"].includes(platformForUrl(url))) {
      urls.add(url.href)
    }
  }
  return urls
}

function introducesPopularityLink(before, after) {
  const existing = popularityUrls(before)
  return [...popularityUrls(after)].some(url => !existing.has(url))
}

module.exports = { introducesPopularityLink }
