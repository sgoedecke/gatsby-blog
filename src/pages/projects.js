import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import { rhythm } from "../utils/typography";

const featuredRepos = [
  {
    name: "socket-io-game",
    url: "https://github.com/sgoedecke/socket-io-game",
    stars: 493,
    blurb: "Experimenting with building a realtime multiplayer game on socket.io."
  },
  {
    name: "gh-standup",
    url: "https://github.com/sgoedecke/gh-standup",
    stars: 117,
    blurb: "A GitHub CLI extension that generates AI-assisted standup reports."
  },
  {
    name: "deckard",
    url: "https://github.com/sgoedecke/deckard",
    stars: 53,
    blurb: "Local AI-text detection for your browser."
  },
  {
    name: "gatsby-blog",
    url: "https://github.com/sgoedecke/gatsby-blog",
    stars: 39,
    blurb: "The source for this blog, including my typography tweaks and content tooling."
  },
  {
    name: "system-one",
    url: "https://github.com/sgoedecke/system-one",
    stars: 37,
    blurb: "Turns any open LLM into a fast \"System One\" classifier that answers a batch of questions in a single forward pass."
  }
];

const ProjectsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Projects" />

      <h2 style={{ marginBottom: rhythm(1 / 2) }}>
        Most-starred GitHub repos
      </h2>
      <ul>
        {featuredRepos.map(repo => (
          <li key={repo.name}>
            <a href={repo.url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>{" "}
            – {repo.blurb}
          </li>
        ))}
      </ul>

      <h2 style={{ marginBottom: rhythm(1 / 2), marginTop: rhythm(1) }}>
        Build log posts
      </h2>

      {posts.map(({ node }) => (
        <article key={node.fields.slug} style={{ marginBottom: rhythm(1) }}>
          <h3 style={{ marginBottom: rhythm(1 / 4) }}>
            <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
          </h3>
          <small>{node.frontmatter.date}</small>
          <p>{node.excerpt}</p>
        </article>
      ))}

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

export default ProjectsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fields: {
          collection: { eq: "blog" }
          isPost: { eq: true }
        }
        frontmatter: { tags: { in: ["projects"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 220)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`;
