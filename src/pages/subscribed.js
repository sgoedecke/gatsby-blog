import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

const SubscribedPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Subscribed" />

      <h2 style={{ marginBottom: rhythm(1) }}>subscribed</h2>

      <p>Thanks for subscribing. You should get the next post by email.</p>

      <p>
        If you do not see anything, check your spam folder or email me at{" "}
        <a href="mailto:sean.goedecke@gmail.com">sean.goedecke@gmail.com</a>.
      </p>

      <p style={{ marginTop: rhythm(1.5) }}>
        <Link to="/" style={{ boxShadow: `none` }}>
          ← Back to blog
        </Link>
      </p>
    </Layout>
  );
};

export default SubscribedPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
