const { html } = require("../lib/html")
const { byDate, excerpt, formatDate } = require("../lib/posts")
const BackToBlog = require("../components/back-to-blog")
const Bio = require("../components/bio")
const Layout = require("../components/layout")

const featuredRepos = [
  {
    name: "socket-io-game",
    url: "https://github.com/sgoedecke/socket-io-game",
    stars: 493,
    blurb: "Experimenting with building a realtime multiplayer game on socket.io.",
  },
  {
    name: "gh-standup",
    url: "https://github.com/sgoedecke/gh-standup",
    stars: 117,
    blurb: "A GitHub CLI extension that generates AI-assisted standup reports.",
  },
  {
    name: "deckard",
    url: "https://github.com/sgoedecke/deckard",
    stars: 53,
    blurb: "Local AI-text detection for your browser.",
  },
  {
    name: "gatsby-blog",
    url: "https://github.com/sgoedecke/gatsby-blog",
    stars: 39,
    blurb: "The source for this blog, including my typography tweaks and content tooling.",
  },
  {
    name: "system-one",
    url: "https://github.com/sgoedecke/system-one",
    stars: 37,
    blurb: `Turns any open LLM into a fast "System One" classifier that answers a batch of questions in a single forward pass.`,
  },
]

exports.data = { permalink: "/projects/" }

exports.render = ({ page, collections }) => {
  const posts = byDate(
    collections.posts.filter(post => (post.data.tags || []).includes("projects"))
  )
  return Layout(
    { url: page.url, title: "Projects" },
    html`<h2 style="margin-bottom:0.875rem">Most-starred GitHub repos</h2>
<ul>${featuredRepos.map(
      repo => html`<li><a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a> – ${repo.blurb}</li>`
    )}</ul>
<h2 style="margin-bottom:0.875rem;margin-top:1.75rem">Build log posts</h2>
${posts.map(
  post => html`<article style="margin-bottom:1.75rem"><h3 style="margin-bottom:0.4375rem"><a style="box-shadow:none" href="${post.url}">${post.data.title}</a></h3><small>${formatDate(post.data.date)}</small><p>${excerpt(post.content, 220)}</p></article>`
)}
${BackToBlog()}
<hr style="margin-bottom:1.75rem"/>
<footer>${Bio()}</footer>`
  )
}
