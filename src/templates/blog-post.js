import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const preview = pageContext.preview
  const hasPreview = Boolean(preview?.snippetHtml)
  const headerMeta = (
    <>
      {post.frontmatter.date}
      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
        <>
          &nbsp;│{" "}
          {post.frontmatter.tags.map((tag, index) => (
            <React.Fragment key={tag}>
              <Link to={`/tags/${tag.toLowerCase()}/`}>{tag}</Link>
              {index < post.frontmatter.tags.length - 1 && ", "}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  )

  return (
    <Layout location={location} title={siteTitle} headerMeta={headerMeta}>
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
        <p>
          If you liked this post, consider{" "}
          <a href="https://buttondown.com/seangoedecke" target="_blank">
            subscribing
          </a>{" "}
          to email updates about my new posts, or{" "}
          <a
            href={`https://news.ycombinator.com/submitlink?u=https://www.seangoedecke.com${location.pathname}&t=${post.frontmatter.title}`}
            target="_blank"
          >
            sharing it on Hacker News
          </a>
          .{hasPreview && " Here's a preview of a related post that shares tags with this one."}
        </p>
        {hasPreview && (
          <blockquote
            style={{
              borderLeft: `4px solid #d9d9d9`,
              marginTop: rhythm(0.5),
              marginBottom: rhythm(0.5),
              paddingLeft: rhythm(0.5),
            }}
          >
            <p
              style={{
                fontWeight: `600`,
                marginBottom: rhythm(0.25),
                marginTop: 0,
              }}
            >
              {preview.title}
            </p>
            <div dangerouslySetInnerHTML={{ __html: preview.snippetHtml }} />
          </blockquote>
        )}
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

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
