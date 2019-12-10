const queries = require(`./src/utils/algolia`)
const macros = require(`./src/utils/katex`)

require(`dotenv`).config()

const gatsbyRemarkPlugins = [
  `gatsby-remark-smartypants`,
  `gatsby-remark-embed-video`,
  `gatsby-remark-responsive-iframe`,
  `gatsby-remark-copy-linked-files`,
  `gatsby-remark-code-titles`,
  `gatsby-remark-sub-sup`,
  `gatsby-remark-autolink-headers`,
  {
    resolve: `gatsby-remark-vscode`,
    options: {
      extensions: [
        { identifier: `silvenon.mdx`, version: `0.1.0` },
        { identifier: `jpoissonnier.vscode-styled-components`, version: `0.0.26` },
      ],
    },
  },
  {
    resolve: `gatsby-remark-katex`,
    options: { macros, throwOnError: false },
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 1200,
      linkImagesToOriginal: false,
      wrapperStyle: `border-radius: 0.5em; overflow: hidden;`,
    },
  },
  {
    resolve: `gatsby-remark-emojis`,
    options: { active: true, size: 24 },
  },
]

module.exports = {
  siteMetadata: {
    title: `janosh.io`,
    description: `Physics, machine learning, sustainability and web development.`,
    author: `Janosh Riebesell`,
    url: `https://janosh.io`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins,
        plugins: [`gatsby-remark-images`, `gatsby-remark-autolink-headers`],
        extensions: [`.mdx`, `.md`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        ignore: process.env.NODE_ENV === `production` && [`**/posts/drafts`],
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: `./content/favicon.png`,
      },
    },
    `gatsby-plugin-lodash`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify-cache`,
  ],
}
