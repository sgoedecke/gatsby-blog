import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Projects = ({ data, location }) => {
  const projects = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={'Projects'}>
      <SEO title="Projects" />
      <p>All of my personal projects live on my GitHub accounts <a href="https://github.com/sgoedecke">here</a> and <a href="https://github.com/seangoedecke">here</a>. This is a short list of the most interesting ones.</p>
      {projects.map(({ node: { frontmatter: { title, link, image }, html }} ) => {
        return (
          <article key={title}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                {title}
              </h3>
            </header>
            <Link to={link}>{link}</Link>
            { image && <img alt={title} src={image} /> }
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: html
                }}
              />
            </section>
          </article>
        )
      })}
      <Bio />
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
    filter: { fields: { collection: { eq: "projects" }}}
) {
          edges {
        node {
        frontmatter {
          title
          link
          image
          }

         html 
        }
      }
    }
  }
`
