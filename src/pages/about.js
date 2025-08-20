import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import { rhythm } from "../utils/typography";

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />

      <p>Hi! I'm Sean Goedecke, an Australian software engineer.</p>
        
      <p>I write about software engineering, with a focus on AI and large-company dynamics. If you want to know more about my background, my resume is publicly available <a target="_blank" href="https://docs.google.com/document/d/17Ql6AydCJ7-XhjrwEqzmRAaAaooARTS5vjEhBZGfrbE/edit?tab=t.0">here</a>.</p>

      <p>
        If you're interested in this blog but you're not sure where to start, you can read my most popular posts <Link to="/popular">here</Link>, or start with one of these:
      </p>

      <p>
        <ul>
          <li><Link to="/how-to-ship">How I ship projects at big tech companies</Link></li>
          <li><Link to="/good-times-are-over">The good times in tech are over</Link></li>
          <li><Link to="/inference-batching-and-deepseek">Why DeepSeek is cheap at scale but expensive to run locally</Link></li>
          <li><Link to="/good-system-design">Everything I know about good system design</Link></li>
        </ul>
      </p>

      <p>
        If you'd like to get in touch, email me at{' '}
        <a href="mailto:sean.goedecke@gmail.com">sean.goedecke@gmail.com</a>. Hearing from readers is one of the main reasons I write at all, so please do reach out if you're thinking about it.
        You can also message me on <a href="https://www.linkedin.com/in/sean-goedecke-5495a7137/">LinkedIn</a>, though I tend to give more longer responses over email.
      </p>

      <p>I also wrote a <a href="/book">book</a> about how the software industry changed after 2021, when the end of zero-interest rates made it much harder to be a software engineer.</p>

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

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata { title }
    }
  }
`;
