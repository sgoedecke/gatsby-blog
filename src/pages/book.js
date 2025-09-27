import React from "react";
import { Link, graphql } from "gatsby";
import Layout  from "../components/layout";
import SEO     from "../components/seo";
import Bio from "../components/bio"
import { rhythm } from "../utils/typography";

const BookPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Book" />
      <footer>
        <Bio />
      </footer>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />

      <h2 style={{ marginBottom: rhythm(1) }}>book</h2>

      <p>
        I've written up my thoughts on software engineering as a <a href="https://www.lulu.com/shop/sean-goedecke/software-engineering-after-the-vibe-shift/paperback/product-jew4ver.html?q=Sean+Goedecke&page=1&pageSize=4" target='_blank'>book</a>, called "Software Engineering after the Vibe Shift". If you've read all my blog posts, there won't be much new in there - it's more of a "pull out the most important points into a coherent structure" thing.
      </p>

      <p>
        I've done this at the request of a few people who prefer to read books than blogs, and I'm hoping it'll be a good way to reach a wider audience. The <a href="https://www.lulu.com/shop/sean-goedecke/software-engineering-after-the-vibe-shift/paperback/product-jew4ver.html?q=Sean+Goedecke&page=1&pageSize=4" target='_blank'>print version</a> is priced at cost. If you'd like a copy and can't afford to pay for it, the raw <a href="https://github.com/sgoedecke/gatsby-blog/blob/master/content/book/book.pdf" target='_blank'>PDF</a> is hosted in the same GitHub repo that hosts this blog.
      </p>

      <p><a href="https://www.lulu.com/shop/sean-goedecke/software-engineering-after-the-vibe-shift/paperback/product-jew4ver.html?q=Sean+Goedecke&page=1&pageSize=4" target='_blank'>You can buy it here!</a></p>

      <p style={{ marginTop: rhythm(1.5) }}>
        <Link to="/" style={{ boxShadow: `none` }}>
          ← Back to blog
        </Link>
      </p>
    </Layout>
  );
};

export default BookPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata { title }
    }
  }
`;
