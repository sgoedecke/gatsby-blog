import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 20,
            }}
          >
            {post.frontmatter.title}
          </h1>
        </header>

        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <p>If you liked this post, consider <a href="https://buttondown.com/seangoedecke" target="_blank">subscribing</a> to email updates about my new posts, or <a href={`https://news.ycombinator.com/submitlink?u=https://www.seangoedecke.com/${location.pathname}`} target="_blank">sharing this post on Hacker News</a>.</p>
        <p>
          {post.frontmatter.date}
          {post.frontmatter.tags && (
            <>
              &nbsp;│ Tags: {post.frontmatter.tags.map((tag, index) => (
                <React.Fragment key={tag}>
                  <Link to={`/tags/${tag.toLowerCase()}/`}>{tag}</Link>
                  {index < post.frontmatter.tags.length - 1 && ", "}
                </React.Fragment>
              ))}
            </>
          )}
        </p>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      fields: { collection: { eq: "blog" }, slug: { eq: $slug } }
    ) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM D, YYYY")
        tags
      }
    }
  }
`
