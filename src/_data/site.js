module.exports = {
  title: `sean goedecke`,
  author: {
    name: `Sean`,
    summary: `works in Melbourne as a software engineer, currently for GitHub.`,
  },
  description: `Sean Goedecke's personal blog`,
  siteUrl: `https://seangoedecke.com`,
  canonicalUrl: `https://www.seangoedecke.com`,
  // Set when building the GitHub Pages mirror, which is served from a
  // subpath (see .github/workflows/github-pages.yml).
  pathPrefix: process.env.PATH_PREFIX || `/`,
  feedTitle: `seangoedecke.com RSS feed`,
  feeds: [`/rss.xml`, `/feed.xml`, `/atom.xml`],
}
