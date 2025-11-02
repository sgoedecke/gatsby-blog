const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);
  const listTemplate     = path.resolve(`./src/templates/blog-list.js`);

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___order], order: DESC }
          filter: { fields: { collection: { eq: "blog" } } }
          limit: 1000
        ) {
          edges {
            node {
              id
              html
              fields {
                slug
              }
              frontmatter {
                title
                order
                date
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges.map(edge => edge.node)

  const overlapCount = (node, sharedTagSet) => {
    if (!node.frontmatter?.tags) {
      return 0
    }

    return node.frontmatter.tags.reduce((count, tag) => {
      return sharedTagSet.has(tag.toLowerCase()) ? count + 1 : count
    }, 0)
  }

  const stripFootnotes = html =>
    html ? html.replace(/<sup\b[^>]*>.*?<\/sup>/gi, "") : ""

  const htmlToPlainText = html =>
    html
      ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : ""

  const buildPreviewSnippet = (html, slug, minWords) => {
    if (!html || !slug) {
      return null
    }

    const sanitizedHtml = stripFootnotes(html)
    const paragraphMatches = sanitizedHtml.match(/<p>.*?<\/p>/gis) || []
    if (paragraphMatches.length === 0) {
      return null
    }

    const selectedParagraphs = []
    let wordCount = 0

    for (const paragraph of paragraphMatches) {
      const words = htmlToPlainText(paragraph)
        .split(/\s+/)
        .filter(Boolean)

      if (words.length === 0) {
        continue
      }

      selectedParagraphs.push(paragraph)
      wordCount += words.length

      if (wordCount >= minWords) {
        break
      }
    }

    if (selectedParagraphs.length === 0) {
      return null
    }

    const lastIndex = selectedParagraphs.length - 1
    selectedParagraphs[lastIndex] = selectedParagraphs[lastIndex].replace(
      /<\/p>$/i,
      `<br /><a href="${slug}">Continue reading...</a></p>`
    )

    return selectedParagraphs.join("")
  }

  const buildPreviewForPost = (post, allPosts) => {
    const tags = post.frontmatter?.tags || []
    if (tags.length === 0) {
      return null
    }

    const sharedTagSet = new Set(tags.map(tag => tag.toLowerCase()))
    const postDate = post.frontmatter?.date
      ? new Date(post.frontmatter.date)
      : null

    const candidates = allPosts.filter(candidate => {
      if (candidate.id === post.id) {
        return false
      }

      if (!candidate.frontmatter?.tags || candidate.frontmatter.tags.length === 0) {
        return false
      }

      return candidate.frontmatter.tags.some(tag =>
        sharedTagSet.has(tag.toLowerCase())
      )
    })

    if (candidates.length === 0) {
      return null
    }

    const olderCandidates =
      postDate !== null
        ? candidates.filter(candidate => {
            const candidateDate = candidate.frontmatter?.date
              ? new Date(candidate.frontmatter.date)
              : null
            return candidateDate && candidateDate < postDate
          })
        : candidates

    const candidatePool =
      olderCandidates.length > 0 ? olderCandidates : candidates

    const bestCandidate = candidatePool.reduce((best, candidate) => {
      const candidateOverlap = overlapCount(candidate, sharedTagSet)

      if (candidateOverlap === 0) {
        return best
      }

      if (!best) {
        return candidate
      }

      const bestOverlap = overlapCount(best, sharedTagSet)

      if (candidateOverlap > bestOverlap) {
        return candidate
      }

      if (candidateOverlap === bestOverlap) {
        const candidateDate = candidate.frontmatter?.date
          ? new Date(candidate.frontmatter.date)
          : null
        const bestDate = best.frontmatter?.date
          ? new Date(best.frontmatter.date)
          : null

        if (candidateDate && bestDate && candidateDate > bestDate) {
          return candidate
        }
      }

      return best
    }, null)

    if (!bestCandidate) {
      return null
    }

    const snippetHtml = buildPreviewSnippet(
      bestCandidate.html,
      bestCandidate.fields?.slug,
      60
    )

    if (!snippetHtml) {
      return null
    }

    return {
      slug: bestCandidate.fields.slug,
      title: bestCandidate.frontmatter.title,
      snippetHtml,
    }
  }

  const getNavigationData = node =>
    node
      ? {
          slug: node.fields.slug,
          title: node.frontmatter.title,
        }
      : null

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : getNavigationData(posts[index + 1])
    const next = index === 0 ? null : getNavigationData(posts[index - 1])
    const preview = buildPreviewForPost(post, posts)

    createPage({
      path: post.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.fields.slug,
        previous,
        next,
        preview,
      },
    })
  })

  const postsPerPage = 15;                       // ← tweak to taste
  const numPages     = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: listTemplate,
      context: {
        limit: postsPerPage,
        skip:  i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Group posts by tag
  const tags = new Set();
  posts.forEach(post => {
    const postTags = post.frontmatter.tags || [];
    postTags.forEach(tag => tags.add(tag));
  });

  // Create a page for each tag
  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag.toLowerCase()}/`, // URL format: /tags/javascript/
      component: path.resolve("./src/templates/tag-page.js"),
      context: {
        tag,
      },
    });
  });
};



exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    
    // Create a seeded random value that changes daily
    const today = new Date().toDateString(); // "Sat Jul 19 2025"
    const seed = today + node.fields?.slug || node.id; // Combine date with unique node identifier
    
    // Simple seeded random function
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    const seededRandom = Math.abs(hash) / 2147483648; // Normalize to 0-1
    
    actions.createNodeField({
      node,
      name: 'rand',
      value: seededRandom,
    });
  }
}
