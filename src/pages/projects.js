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
    stars: 490,
    blurb: "Experimenting with building a realtime multiplayer game on socket.io."
  },
  {
    name: "gh-standup",
    url: "https://github.com/sgoedecke/gh-standup",
    stars: 88,
    blurb: "A GitHub CLI extension that generates AI-assisted standup reports."
  },
  {
    name: "gatsby-blog",
    url: "https://github.com/sgoedecke/gatsby-blog",
    stars: 23,
    blurb: "The source for this blog, including my typography tweaks and content tooling."
  },
  {
    name: "idea-mill",
    url: "https://github.com/sgoedecke/idea-mill",
    stars: 14,
    blurb: "LLM-powered brainstorming app that mashes ideas together."
  },
  {
    name: "blockchain-js-demo",
    url: "https://github.com/sgoedecke/blockchain-js-demo",
    stars: 12,
    blurb: "A minimal blockchain client I use when teaching the fundamentals."
  }
];

const ProjectsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Projects" />

      <p>
        I ship a lot of experiments and side projects, then write up what I
        learned. Here’s where you can find the code that people star most often
        plus the associated build logs.
      </p>

      <h2 style={{ marginBottom: rhythm(1 / 2) }}>
        Most-starred GitHub repos
      </h2>
      <ul>
        {featuredRepos.map(repo => (
          <li key={repo.name}>
            <a href={repo.url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>{" "}
            – {repo.blurb} ({repo.stars} stars)
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
      filter: { frontmatter: { tags: { in: ["projects"] } } }
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
