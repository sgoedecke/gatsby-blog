import React from "react";
import { Link, graphql } from "gatsby";
import Layout  from "../components/layout";
import SEO     from "../components/seo";
import { rhythm } from "../utils/typography";

const PopularPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts     = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Popular posts" />

      <h1 style={{ marginBottom: rhythm(1) }}>Popular posts</h1>

      {posts.map(({ node }) => (
        <article key={node.fields.slug}>
          <h3 style={{ marginBottom: rhythm(1/4) }}>
            <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
          </h3>
          <p>{node.frontmatter.date}</p>
        </article>
      ))}

      <p style={{ marginTop: rhythm(1.5) }}>
        <Link to="/" style={{ boxShadow: `none` }}>
          ← Back to blog
        </Link>
      </p>
    </Layout>
  );
};

export default PopularPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata { title }
    }
    allMarkdownRemark(
      filter: { frontmatter: { popular: { eq: true } } }
      sort:   { fields: [frontmatter___order], order: DESC }
    ) {
      edges {
        node {
          fields   { slug }
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`;
