module.exports = {
  pathPrefix: '/text',
  siteMetadata: {
    title: `Text`,
    description: `Display text app`,
    author: `@nosmileface`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Text`,
        short_name: `Text`,
        start_url: `/`,
        background_color: `#111827`,
        theme_color: `#111827`,
        display: `standalone`,
        icon: `icon/text.png`,
        orientation: `portrait`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
