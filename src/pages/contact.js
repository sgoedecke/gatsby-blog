import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import { rhythm } from "../utils/typography";

const ContactPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Contact" />

      <p>
        If you'd like to get in touch, email me at{' '}
        <a href="mailto:sean.goedecke@gmail.com">sean.goedecke@gmail.com</a>. Hearing from readers is one of the main reasons I write at all, so please do reach out if you're thinking about it.
      </p>

      <p>
        You can also message me on <a href="https://www.linkedin.com/in/sean-goedecke-5495a7137/">LinkedIn</a>, though I tend to give more longer responses over email.
      </p>

      <p style={{ marginTop: rhythm(1.5) }}>
        <Link to="/" style={{ boxShadow: `none` }}>
          ← Back to blog
        </Link>
      </p>

      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />

      <footer>
        <Bio />
      </footer>
    </Layout>
  );
};

export default ContactPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata { title }
    }
  }
`;
