import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const TagPage = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.edges;
  const { tag } = pageContext;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`Posts tagged "${tag}"`} />
      <h2>Posts tagged with "{tag}"</h2>
      <ul>
        {posts.map(({ node }) => (
          <li key={node.fields.slug}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">← Back to blog</Link>
    </Layout>
  );
};

export default TagPage;

export const pageQuery = graphql`
  query($tag: String!) {
    site {
      siteMetadata { title }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } }, fields: { collection: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields { slug }
          frontmatter { title }
        }
      }
    }
  }
`;
