import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import { rhythm } from "../utils/typography";

const PodcastsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Podcasts" />

      <p>
        I occasionally appear on podcasts:
      </p>

      <ul>
        <li>
          <a
            href="https://www.youtube.com/watch?v=IekJKQ-AvkM&t=1s&pp=ygUNc2VhbiBnb2VkZWNrZQ%3D%3D"
            target="_blank"
            rel="noreferrer"
          >
            The Pragmatic Engineer Podcast
          </a>{" "}
          - talking about what it means to ship in large tech companies.
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=jaK2VxJxVQE&feature=youtu.be"
            target="_blank"
            rel="noreferrer"
          >
            The Changelog
          </a>{" "}
          - talking about blogging, having opinions on the internet, and big tech companies.
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=DRyb3jA0ZOM&pp=ygUPInNlYW4gZ29lZGVja2Ui"
            target="_blank"
            rel="noreferrer"
          >
            ABC News
          </a>{" "}
          - not a podcast, but a brief TV news interview about AI sycophancy.
        </li>
        <li>
          <a
            href="https://youtu.be/R5TAZe4ye8U"
            target="_blank"
            rel="noreferrer"
          >
            Exponent Podcast: Good System Design
          </a>{" "}
          - talking about system design interviews and getting promoted to Staff Engineer.
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=FuLiTh42CHg&list=PLuuxpDWxclfJF9W1CwT_mTLy1LdVCmiL5&index=4&t=634s"
            target="_blank"
            rel="noreferrer"
          >
            Fork Around And Find Out
          </a>{" "}
          - talking about how to build trust in big tech companies.
        </li>
        <li>
          <a
            href="https://youtu.be/aJl7YFSXES0?si=PyVM26Ej4vJzdQae"
            target="_blank"
            rel="noreferrer"
          >
            Humans of Reliability Podcast
          </a>{" "}
          - talking about how I use LLMs to help with my work.
        </li>
      </ul>

      <p>
        Will I appear on your podcast? Maybe, depending on how busy I am. If you'd like me to, email me at {" "}
        <a href="mailto:sean.goedecke@gmail.com">sean.goedecke@gmail.com</a>{" "}
        and I'll get back to you. Note that I'm in Australia and my timezone may not overlap with yours.
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

export default PodcastsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
