import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RecommendedPosts from "../components/recommended-posts"
import { rhythm } from "../utils/typography"

const SubscribeSuccessPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Subscribed" />

      <h2 style={{ marginBottom: rhythm(1) }}>subscribed</h2>

      <p>
        Thank you for subscribing! I hope you enjoy my posts. Please do reply to
        the emails if you have thoughts, I love getting feedback from
        subscribers. And if you haven't seen them already, you might be
        interested in these popular posts of mine:
      </p>

      <RecommendedPosts />

      <p style={{ marginTop: rhythm(1.5) }}>
        <Link to="/" style={{ boxShadow: `none` }}>
          ← Back to blog
        </Link>
      </p>
    </Layout>
  )
}

export default SubscribeSuccessPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
