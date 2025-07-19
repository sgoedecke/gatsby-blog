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
              fields {
                slug
              }
              frontmatter {
                title
                order
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
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
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
    const postTags = post.node.frontmatter.tags || [];
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
