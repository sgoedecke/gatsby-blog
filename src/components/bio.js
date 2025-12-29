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
        <a href="https://buttondown.com/seangoedecke" target="_blank">subscribe</a> │ <Link to="/about">about</Link> │ <Link to="/podcasts">podcasts</Link> │ <Link to="/popular">popular</Link> │ <Link to="/tags">tags</Link> │ <a href="/rss.xml">rss</a>
      </p>
    </div>
  )
}

export default Bio
