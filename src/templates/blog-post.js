import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const otherPosts = data.allMarkdownRemark.nodes.filter(node => {
    return node.id !== post.id
  })

  const sharedTag =
    post.frontmatter.tags?.map(tag => tag.toLowerCase()) || []
  const sharedTagSet = new Set(sharedTag)
  const previewCandidates = otherPosts.filter(node => {
    if (!node.frontmatter?.tags || !node.frontmatter.dateRaw) {
      return false
    }

    return node.frontmatter.tags.some(tag =>
      sharedTagSet.has(tag.toLowerCase())
    )
  })
  const currentDate = post.frontmatter.dateRaw
    ? new Date(post.frontmatter.dateRaw)
    : null
  const olderCandidates = currentDate
    ? previewCandidates.filter(node => {
        const candidateDate = node.frontmatter.dateRaw
          ? new Date(node.frontmatter.dateRaw)
          : null

        return (
          candidateDate &&
          candidateDate < currentDate &&
          node.frontmatter.tags?.length
        )
      })
    : previewCandidates
  const overlapCount = node => {
    if (!node?.frontmatter?.tags) {
      return 0
    }

    return node.frontmatter.tags.reduce((count, tag) => {
      return sharedTagSet.has(tag.toLowerCase()) ? count + 1 : count
    }, 0)
  }
  const pickBestCandidate = candidates =>
    candidates.reduce((best, candidate) => {
      const candidateOverlap = overlapCount(candidate)
      if (!candidateOverlap) {
        return best
      }

      if (!best) {
        return candidate
      }

      const bestOverlap = overlapCount(best)
      if (candidateOverlap > bestOverlap) {
        return candidate
      }

      if (candidateOverlap === bestOverlap) {
        const candidateDate = candidate.frontmatter.dateRaw
          ? new Date(candidate.frontmatter.dateRaw)
          : null
        const bestDate = best.frontmatter.dateRaw
          ? new Date(best.frontmatter.dateRaw)
          : null

        if (candidateDate && bestDate && candidateDate > bestDate) {
          return candidate
        }
      }

      return best
    }, null)
  const candidatePool =
    olderCandidates.length > 0 ? olderCandidates : previewCandidates
  const previewPost = pickBestCandidate(candidatePool)

  const stripFootnotes = html =>
    html ? html.replace(/<sup\b[^>]*>.*?<\/sup>/gi, "") : ""
  const htmlToPlainText = html =>
    html
      ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : ""

  const sanitizedHtml = stripFootnotes(previewPost?.html || "")
  const paragraphMatches =
    sanitizedHtml && sanitizedHtml.match(/<p>.*?<\/p>/gis)
  const firstParagraphHtml = paragraphMatches ? paragraphMatches[0] : null
  const firstParagraphText = htmlToPlainText(firstParagraphHtml)
  const requiredWordCount = 20
  const wordsInFirstParagraph = firstParagraphText
    ? firstParagraphText.split(/\s+/).filter(Boolean)
    : []
  let paragraphHtmlWithMinWords = firstParagraphHtml

  if (
    paragraphHtmlWithMinWords &&
    wordsInFirstParagraph.length < requiredWordCount
  ) {
    const remainingHtml = sanitizedHtml.replace(firstParagraphHtml, "")
    const remainingWords = htmlToPlainText(remainingHtml)
      .split(/\s+/)
      .filter(Boolean)
    const neededWords = remainingWords.slice(
      0,
      requiredWordCount - wordsInFirstParagraph.length
    )

    if (neededWords.length) {
      paragraphHtmlWithMinWords = firstParagraphHtml.replace(
        /<\/p>$/i,
        ` ${neededWords.join(" ")}</p>`
      )
    }
  }

  const paragraphTextAfterPadding = htmlToPlainText(paragraphHtmlWithMinWords)
  const hasMinimumWords =
    paragraphTextAfterPadding.split(/\s+/).filter(Boolean).length >=
    requiredWordCount
  const previewParagraphHtml =
    hasMinimumWords && previewPost?.fields?.slug && paragraphHtmlWithMinWords
      ? paragraphHtmlWithMinWords.replace(
          /<\/p>$/i,
          ` <a href="${previewPost.fields.slug}">Continue reading...</a></p>`
        )
      : null
  const hasPreview = Boolean(previewPost && previewParagraphHtml)
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
          .
          {hasPreview && (
            <>
              <br />
              <br />
              Here's a preview of a related post,{" "}
              <strong>{previewPost.frontmatter.title}</strong>:
            </>
          )}
        </p>
        {hasPreview && (
          <aside
            style={{
              marginTop: rhythm(0.5),
              marginBottom: rhythm(0.5),
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: previewParagraphHtml }} />
          </aside>
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
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        html
        fields {
          slug
        }
        frontmatter {
          title
          dateRaw: date
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
        dateRaw: date
        tags
      }
    }
  }
`
