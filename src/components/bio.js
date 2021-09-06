/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

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

  const { author } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: 0,
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        <strong>{author.name}</strong> {author.summary} Recruiters, please read <Link to="/my-engineering-values">this</Link> post on what I'm looking for. <br />
        <Link to="/">articles</Link> | <a href="https://docs.google.com/document/d/17Ql6AydCJ7-XhjrwEqzmRAaAaooARTS5vjEhBZGfrbE/edit?usp=sharing">resume</a> |{" "}
        <a href="https://github.com/sgoedecke">github</a> | <a href="https://www.linkedin.com/in/sean-goedecke-5495a7137/">linkedin</a>
      </p>
    </div>
  )
}

export default Bio
