import { existsSync, readFileSync, readdirSync } from "node:fs"
import path from "node:path"
import YAML from "yaml"

const FRONTMATTER = /^---\n([\s\S]*?)\n---/

export function loadPosts(repoRoot) {
  const blogDir = path.join(repoRoot, "content/blog")
  return readdirSync(blogDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(blogDir, entry.name, "index.md"))
    .filter(file => existsSync(file))
    .map(file => {
      const match = readFileSync(file, "utf8").match(FRONTMATTER)
      const frontmatter = (match && YAML.parse(match[1])) || {}
      return {
        slug: path.basename(path.dirname(file)),
        popular: frontmatter.popular === true,
        score: Number(frontmatter.popularity?.score || 0),
        order: Number(frontmatter.order || 0),
        crossPosts: frontmatter.crossPosts || {},
        autoShare: frontmatter.autoShare !== false,
      }
    })
}

export function isSharedEverywhere(post, platforms) {
  return platforms.every(platform => post.crossPosts[platform])
}

// Candidates for the daily "old post" share, best first: posts on the /popular
// page in the same order as that page (popularity score, then newest first),
// then the remaining posts at random. A post counts as unshared until it's on
// every platform. Once everything has been shared, any post can come up again.
// Posts with `autoShare: false` in their frontmatter are never picked.
export function pickCandidates(allPosts, platforms, random = Math.random) {
  const posts = allPosts.filter(post => post.autoShare !== false)
  const unshared = posts.filter(post => !isSharedEverywhere(post, platforms))
  if (!unshared.length) return shuffle(posts, random).map(post => post.slug)
  const popular = unshared
    .filter(post => post.popular)
    .sort((a, b) => b.score - a.score || b.order - a.order)
  const rest = shuffle(
    unshared.filter(post => !post.popular),
    random
  )
  return [...popular, ...rest].map(post => post.slug)
}

function shuffle(items, random) {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
