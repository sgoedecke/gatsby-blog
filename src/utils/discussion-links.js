const discussionParagraphs = content =>
  content.split(/\n\s*\n/).filter(paragraph => {
    if (/^\s*\[\^/.test(paragraph)) {
      return false
    }

    return (
      /^\s*(?:edit\b|update\b|\*\*update:\*\*)/i.test(paragraph) ||
      /this (post|article) (was|got|also got|made)/i.test(paragraph) ||
      /got (some|lots of|quite a few|a bunch of|many) comments/i.test(
        paragraph
      ) ||
      /was discussed/i.test(paragraph) ||
      /posted on/i.test(paragraph) ||
      /made it to/i.test(paragraph) ||
      /attention on/i.test(paragraph) ||
      /traction on/i.test(paragraph) ||
      /check out.*discussion/i.test(paragraph) ||
      /there (are|is).*comments/i.test(paragraph) ||
      /some interesting discussion of this post/i.test(paragraph) ||
      /I (also )?discussed (it|this)/i.test(paragraph) ||
      /I gave .*interview.*this topic/i.test(paragraph)
    )
  })

const platformForUrl = url => {
  const host = url.hostname.replace(/^(www|old|m)\./, "")

  if (
    host === "news.ycombinator.com" &&
    url.pathname === "/item" &&
    /^\d+$/.test(url.searchParams.get("id") || "")
  ) {
    return "hn"
  }
  if (host === "lobste.rs" && /^\/s\/[a-z0-9]+(?:\/|$)/i.test(url.pathname)) {
    return "lobsters"
  }
  if (
    host === "reddit.com" &&
    /^\/(?:r\/[^/]+\/)?comments\/[a-z0-9]+(?:\/|$)/i.test(url.pathname)
  ) {
    return "reddit"
  }
  if (
    (host === "youtube.com" &&
      ((url.pathname === "/watch" && url.searchParams.get("v")) ||
        /^\/(?:shorts|live)\/[\w-]+/.test(url.pathname))) ||
    (host === "youtu.be" && /^\/[\w-]+/.test(url.pathname))
  ) {
    return "youtube"
  }
  return null
}

const popularityKeys = {
  hn: "hackerNews",
  lobsters: "lobsters",
  youtube: "youtube",
  reddit: "reddit",
}

const extractDiscussionLinks = content => {
  const links = new Map()
  const urlPattern = /https?:\/\/(?:news\.ycombinator\.com|lobste\.rs|(?:(?:www|old|m)\.)?reddit\.com|(?:(?:www|m)\.)?youtube\.com|youtu\.be)\/[^\s)>]+/gi

  for (const paragraph of discussionParagraphs(content)) {
    // Later sentences often cite individual comments or unrelated source material.
    const introduction = paragraph.match(/^[\s\S]*?(?:[.!?](?=\s|$)|$)/)[0]

    for (const match of introduction.matchAll(urlPattern)) {
      const url = new URL(match[0])
      const platform = platformForUrl(url)
      if (platform) {
        links.set(`${platform}:${url.href}`, { platform, url: url.href })
      }
    }
  }

  return Object.keys(popularityKeys).flatMap(platform =>
    [...links.values()].filter(link => link.platform === platform)
  )
}

const storedUrls = (popularity, platform) => {
  const key = popularityKeys[platform]
  const urls = popularity?.[key]?.urls
  if (urls === undefined) {
    return undefined
  }
  if (
    !Array.isArray(urls) ||
    urls.some(url => typeof url !== "string" || !/^https?:\/\//.test(url))
  ) {
    throw new Error(`popularity.${key}.urls must be a list of HTTP(S) URLs`)
  }
  for (const url of urls) {
    if (platformForUrl(new URL(url)) !== platform) {
      throw new Error(`Invalid ${key} discussion URL: ${url}`)
    }
  }
  return urls
}

const getDiscussionLinks = popularity =>
  Object.keys(popularityKeys).flatMap(platform => {
    const url = storedUrls(popularity, platform)?.[0]
    return url ? [{ platform, url }] : []
  })

const backfillDiscussionUrls = (popularity = {}, content) => {
  const result = { ...popularity }
  const links = extractDiscussionLinks(content)

  for (const [platform, key] of Object.entries(popularityKeys)) {
    if (storedUrls(popularity, platform) !== undefined) {
      continue
    }
    const urls = links
      .filter(link => link.platform === platform)
      .map(link => link.url)
    if (popularity?.[key] || urls.length > 0) {
      result[key] = { ...popularity?.[key], urls }
    }
  }
  return result
}

module.exports = {
  extractDiscussionLinks,
  getDiscussionLinks,
  backfillDiscussionUrls,
}
