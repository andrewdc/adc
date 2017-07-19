module.exports = {
  siteMetadata: {
    title: 'Andrew Colclough - Designer, Developer, Illustrator',
    siteTitle: "Andrew Colclough - Designer, Developer, Illustrator",
    siteDescr: "Designer | Developer | Illustrator",
    siteAuthor: "Andrew Colclough",

    siteTwitterUrl: "https://twitter.com/wtc",
    siteGithubUrl: "https://github.com/andrewdc",
    siteEmailUrl: "andrew.design@gmail.com",
    siteDribbbleUrl: "https://dribbble.com/adc",

    siteInstagram: "https://www.instagram.com/bullet_and_whiskey/",
    siteLinkedin: "https://www.linkedin.com/in/andrewdc",

    googleAnalyticsId: "UA-90869201-1",

    linkPrefix: "/adc"
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
  ],
}
