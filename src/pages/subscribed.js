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

      <h2 style={{ marginBottom: rhythm(1) }}>subscribing</h2>

      <p>
        Thanks for subscribing! You should get a confirmation email in your inbox. You'll have to click the link in that email before you'll be properly subscribed.
      </p>

      <p>
        If you don't see the confirmation email, check your spam folder.
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
