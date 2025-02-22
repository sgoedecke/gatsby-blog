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
        <Link to="/">posts</Link> │ <a href="https://docs.google.com/document/d/17Ql6AydCJ7-XhjrwEqzmRAaAaooARTS5vjEhBZGfrbE/edit?usp=sharing">resume</a> │{" "}
        <a href="https://github.com/sgoedecke">github</a> │ <a href="https://www.linkedin.com/in/sean-goedecke-5495a7137/">linkedin</a> │ <a href="/rss.xml">rss</a> │ <a href="https://github.com/marketplace/models">what I'm working on now</a>
      </p>
    </div>
  )
}

export default Bio
