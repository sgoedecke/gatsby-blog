const createFeed = ({ output, title }) => ({
  serialize: ({ query: { site, allMarkdownRemark } }) => {
    const formatDate = date => new Date(date).toUTCString();
    return allMarkdownRemark.nodes.map(node => ({
      title: node.frontmatter.title,
      description: node.excerpt,
      date: formatDate(node.frontmatter.date),
      url: site.siteMetadata.siteUrl + node.fields.slug,
      guid: site.siteMetadata.siteUrl + node.fields.slug,
    }));
  },
  query: `
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
      ) {
        nodes {
          excerpt(pruneLength: 400)
          fields { slug }
          frontmatter {
            title
            date
          }
        }
      }
    }
  `,
  output,
  title,
});

module.exports = {
  siteMetadata: {
    title: `sean goedecke`,
    author: {
      name: `Sean`,
      summary: `works in Melbourne as a software engineer, currently for GitHub.`,
    },
    description: `Sean Goedecke's personal blog`,
    siteUrl: `https://seangoedecke.com/`,
    social: {
      foo: "bar",
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sean Goedecke`,
        short_name: `sean-goedecke`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-remark-collection`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          createFeed({
            output: "/rss.xml",
            title: "seangoedecke.com RSS feed",
          }),
          createFeed({
            output: "/feed.xml",
            title: "seangoedecke.com RSS feed",
          }),
          createFeed({
            output: "/atom.xml",
            title: "seangoedecke.com RSS feed",
          }),
        ],
      },
    },
  ],
}
