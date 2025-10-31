import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const otherPosts = data.allMarkdownRemark.nodes.filter(
    node => node.id !== post.id
  )

  const sharedTag = post.frontmatter.tags?.map(tag => tag.toLowerCase()) || []
  const previewPost = otherPosts.find(node => {
    if (!node.frontmatter?.tags) {
      return false
    }

    return node.frontmatter.tags.some(tag =>
      sharedTag.includes(tag.toLowerCase())
    )
  })

  const previewParagraphMatch =
    previewPost?.html && previewPost.html.match(/<p>.*?<\/p>/s)
  const previewParagraph = previewParagraphMatch
    ? previewParagraphMatch[0]
    : null

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
        <p>If you liked this post, consider <a href="https://buttondown.com/seangoedecke" target="_blank">subscribing</a> to email updates about my new posts, or <a href={`https://news.ycombinator.com/submitlink?u=https://www.seangoedecke.com${location.pathname}&t=${post.frontmatter.title}`} target="_blank">sharing it on Hacker News</a>.</p>
        {previewPost && (
          <aside
            style={{
              marginTop: rhythm(1.5),
              marginBottom: rhythm(0.5),
            }}
          >
            <p>And now for a preview of another post:</p>
            <h3 style={{ marginBottom: rhythm(0.5) }}>
              <Link to={previewPost.fields.slug}>
                {previewPost.frontmatter.title}
              </Link>
            </h3>
            {previewParagraph && (
              <div dangerouslySetInnerHTML={{ __html: previewParagraph }} />
            )}
          </aside>
        )}
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
    allMarkdownRemark(filter: { fields: { collection: { eq: "blog" } } }) {
      nodes {
        id
        html
        fields {
          slug
        }
        frontmatter {
          title
          tags
        }
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
