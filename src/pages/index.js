import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const popularPosts = posts.filter(({ node }) => node.frontmatter.popular).reverse()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />

      <footer>
        <Bio />
      </footer>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
    <section>
        <h2>popular</h2>
        {popularPosts.map(({ node }) => (
          <article key={node.fields.slug}>
            <h3>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </h3>
          </article>
        ))}
      </section>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <section>
        <h2>recent</h2>
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
              <p> {node.frontmatter.date} </p>
            </article>
          )
        })}
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___order], order: DESC }
      filter: { fields: { collection: { eq: "blog" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            order
            popular
            date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`
