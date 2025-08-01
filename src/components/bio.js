/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: 0,
      }}
    >
      <p>
        <Link to="/">posts</Link> │ <a href="https://buttondown.com/seangoedecke" target="_blank">subscribe</a> │ <a href="https://www.linkedin.com/in/sean-goedecke-5495a7137/">linkedin</a> │ <a href="/rss.xml">rss</a> │ <a href="/book">book</a> │ <a href="https://github.blog/ai-and-ml/llms/solving-the-inference-problem-for-open-source-ai-projects-with-github-models/">what I'm currently working on</a>
      </p>
    </div>
  )
}

export default Bio
