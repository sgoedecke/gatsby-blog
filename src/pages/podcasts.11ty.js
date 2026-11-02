const { html } = require("../lib/html")
const BackToBlog = require("../components/back-to-blog")
const Bio = require("../components/bio")
const Layout = require("../components/layout")

const podcasts = [
  {
    name: "The Pragmatic Engineer Podcast",
    url: "https://www.youtube.com/watch?v=IekJKQ-AvkM&t=1s&pp=ygUNc2VhbiBnb2VkZWNrZQ%3D%3D",
    about: "talking about what it means to ship in large tech companies.",
  },
  {
    name: "99% Invisible",
    url: "https://www.youtube.com/watch?v=nXfiQrTmDCI",
    about: "talking about how AI uses the em-dash (I come in at around 25 minutes).",
  },
  {
    name: "The Changelog",
    url: "https://www.youtube.com/watch?v=jaK2VxJxVQE&feature=youtu.be",
    about: "talking about blogging, having opinions on the internet, and big tech companies.",
  },
  {
    name: "ABC News",
    url: "https://www.youtube.com/watch?v=DRyb3jA0ZOM&pp=ygUPInNlYW4gZ29lZGVja2Ui",
    about: "not a podcast, but a brief TV news interview about AI sycophancy.",
  },
  {
    name: "Exponent Podcast: Good System Design",
    url: "https://youtu.be/R5TAZe4ye8U",
    about: "talking about system design interviews and getting promoted to Staff Engineer.",
  },
  {
    name: "Fork Around And Find Out",
    url: "https://www.youtube.com/watch?v=FuLiTh42CHg&list=PLuuxpDWxclfJF9W1CwT_mTLy1LdVCmiL5&index=4&t=634s",
    about: "talking about how to build trust in big tech companies.",
  },
  {
    name: "Humans of Reliability Podcast",
    url: "https://youtu.be/aJl7YFSXES0?si=PyVM26Ej4vJzdQae",
    about: "talking about how I use LLMs to help with my work.",
  },
  {
    name: "Grammar Girl Podcast",
    url: "https://open.spotify.com/episode/3MrvW07qQhtElS5Htboys9?si=BR0gtJgmSjS9xjZsA00OOA",
    about: "talking about how LLMs and humans use the em-dash.",
  },
  {
    name: "The Staff Plus Journey",
    url: "https://podcasts.apple.com/us/podcast/hidden-laws-of-software-engineering-sean-goedecke/id1873186078?i=1000753723834",
    about: "talking about how to build good relationships with your manager and how staff promos work.",
  },
  {
    name: "Dead Code",
    url: "https://shows.acast.com/dead-code/episodes/frankensteins-system-with-sean-goedecke",
    about: `talking about generic vs concrete system design, and some of the pitfalls of "software architect" roles.`,
  },
]

exports.data = { permalink: "/podcasts/" }

exports.render = ({ page }) =>
  Layout(
    { url: page.url, title: "Podcasts" },
    html`<p>I occasionally appear on podcasts:</p>

<ul>${podcasts.map(
      podcast => html`
<li><a href="${podcast.url}" target="_blank" rel="noreferrer">${podcast.name}</a> - ${podcast.about}</li>`
    )}
</ul>

<p>Will I appear on your podcast? Maybe, depending on how busy I am. If you'd like me to, email me at <a href="mailto:sean.goedecke@gmail.com">sean.goedecke@gmail.com</a> and I'll get back to you. Note that I'm in Australia and my timezone may not overlap with yours.</p>

${BackToBlog()}
<hr style="margin-bottom:1.75rem"/>
<footer>${Bio()}</footer>`
  )
