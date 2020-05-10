module.exports = {
  siteMetadata: {
    title: `Naomi Mitsuko Makkelie`,
    description: `Naomi Mitsuko Makkelie is an artist based in Amsterdam.`,
    siteUrl: `https://www.naomimakkelie.nl`,
    author: `@jewetnitg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // TODO make dynamic based on deployment environment
        trackingId: "UA-59379901-1",
        head: false,
        anonymize: false,
        respectDNT: true,
      },
    },
  ],
};
