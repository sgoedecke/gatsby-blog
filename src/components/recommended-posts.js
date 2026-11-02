const { html } = require("../lib/html")

const posts = [
  {
    path: "/how-to-ship",
    title: "How I ship projects at big tech companies",
  },
  {
    path: "/seeing-like-a-software-company",
    title: "Seeing like a software company",
  },
  {
    path: "/good-times-are-over",
    title: "The good times in tech are over",
  },
  {
    path: "/inference-batching-and-deepseek",
    title: "Why DeepSeek is cheap at scale but expensive to run locally",
  },
  {
    path: "/good-system-design",
    title: "Everything I know about good system design",
  },
]

const RecommendedPosts = () => html`<ul>
  ${posts.map(post => html`<li><a href="${post.path}">${post.title}</a></li>`)}
</ul>`

module.exports = RecommendedPosts
