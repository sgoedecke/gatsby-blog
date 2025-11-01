import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogList = ({ data, location, pageContext = {} }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { currentPage = 1, numPages = 1 } = pageContext;
  const popularPosts = data.popular.nodes.slice(0, 3)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={currentPage === 1 ? "All posts" : `Page ${currentPage}`} />

      <footer>
        <Bio />
      </footer>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      { currentPage === 1 && (<>
        <section>
            <h2>popular</h2>
            {popularPosts.map((node) => (
            <article key={node.fields.slug}>
                <h3>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {node.frontmatter.title}
                </Link>
                </h3>
            </article>
            ))}

            <p style={{ marginTop: rhythm(0.5) }}>
                <Link to="/popular" style={{ boxShadow: `none` }}>
                View all&nbsp;→
                </Link>
            </p>
        </section>
        <hr
            style={{
            marginBottom: rhythm(1),
            }}
        />
      </>)}

      <section>
        { currentPage == 1 && <h2>recent</h2> }
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3 style={{ marginBottom: rhythm(1 / 4) }}>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
              </header>

              <p className="post-meta">
                {node.frontmatter.date}
                {node.frontmatter.tags && node.frontmatter.tags.length > 0 && (
                  <>
                    &nbsp;│{" "}
                    {node.frontmatter.tags.map((tag, index) => (
                      <React.Fragment key={tag}>
                        <Link to={`/tags/${tag.toLowerCase()}/`}>{tag}</Link>
                        {index < node.frontmatter.tags.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </p>
            </article>
          )
        })}
      </section>

      <nav style={{ marginTop: rhythm(1) }}>
        {currentPage > 1 && (
          <Link to={currentPage === 2 ? `/` : `/page/${currentPage - 1}`} rel="prev">
            ← Newer Posts
          </Link>
        )}
        {currentPage < numPages && (
          <span style={{ float: "right" }}>
            <Link to={`/page/${currentPage + 1}`} rel="next">
              Older Posts →
            </Link>
          </span>
        )}
      </nav>
    </Layout>
  )
}

export default BlogList

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata { title }
    }
    popular: allMarkdownRemark(
      filter: { frontmatter: { popular: { eq: true } } }
      sort:   { fields: [fields___rand], order: ASC }
      limit:  3
    ) {
      nodes { fields { slug } frontmatter { title } }
    }
    allMarkdownRemark(
      sort:   { fields: [frontmatter___order], order: DESC }
      filter: { fields: { collection: { eq: "blog" } } }
      limit:  $limit
      skip:   $skip
    ) {
      edges {
        node {
          excerpt
          fields { slug }
          frontmatter {
            title description order popular
            date(formatString: "MMMM D, YYYY")
            tags
          }
        }
      }
    }
  }
`;
