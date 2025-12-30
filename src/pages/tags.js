import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import { rhythm } from "../utils/typography";

const TagsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const tagGroups = data.allMarkdownRemark.group
    .filter(group => Boolean(group.fieldValue))
    .sort((a, b) => a.fieldValue.localeCompare(b.fieldValue, undefined, { sensitivity: "base" }));

  const counts = tagGroups.map(tag => tag.totalCount);
  const minCount = counts.length > 0 ? Math.min(...counts) : 1;
  const maxCount = counts.length > 0 ? Math.max(...counts) : 1;
  const minFontSize = 0.9;
  const maxFontSize = 2.1;

  const getFontSize = count => {
    if (minCount === maxCount) {
      return (minFontSize + maxFontSize) / 2;
    }

    const weight = (count - minCount) / (maxCount - minCount);
    return minFontSize + weight * (maxFontSize - minFontSize);
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Tags" />
      <footer>
        <Bio />
      </footer>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <h2>tags</h2>
      <div className="tag-cloud" aria-label="Tag cloud">
        {tagGroups.map(tag => (
          <Link
            key={tag.fieldValue}
            to={`/tags/${tag.fieldValue.toLowerCase()}/`}
            className="tag-cloud__link"
            style={{ fontSize: `${getFontSize(tag.totalCount)}rem` }}
          >
            {tag.fieldValue}
            <span className="tag-cloud__count">{tag.totalCount}</span>
          </Link>
        ))}
      </div>
      <p style={{ marginTop: rhythm(1.5) }}>
        <Link to="/" style={{ boxShadow: `none` }}>
          ← Back to blog
        </Link>
      </p>
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsPageQuery {
    site {
      siteMetadata { title }
    }
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
