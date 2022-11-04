// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require("dotenv").config();

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: process.env.SITE_TITLE,
  tagline: "",
  url: process.env.SITE_URL,
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: process.env.ORGANIZATION_NAME,
  projectName: process.env.REPOSITORY_NAME,
  customFields: {
    giscusDiscussionCategory: process.env.GISCUS_DISCUSSION_CATEGORY,
    giscusDiscussionCategoryId: process.env.GISCUS_DISCUSSION_CATEGORY_ID,
    giscusProjectId: process.env.GISCUS_PROJECT_ID,
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: process.env.GOOGLE_ANALYTICS_TAG_ID,
          anonymizeIP: true,
        },
      }),
    ],
  ],
  plugins: [
    [
      "./plugins/blog-plugin",
      {
        id: "blog",
        routeBasePath: "blog",
        path: "./blog",
        blogSidebarCount: 0,
        showReadingTime: true,
        editUrl: ({ blogDirPath, blogPath }) => {
          return `https://github.com/${process.env.ORGANIZATION_NAME}/${process.env.REPOSITORY_NAME}/edit/main/${blogDirPath}/${blogPath}`;
        },
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "blog-work",
        routeBasePath: "work",
        path: "./blog-work",
        blogSidebarCount: 0,
        blogTitle: "Featured Work",
        showReadingTime: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
      },
      navbar: {
        title: process.env.SITE_TITLE,
        logo: {
          alt: "KG Logo",
          src: "img/logo.png",
        },
        items: [
          { to: "/about", label: "About", position: "right" },
          { to: "/blog", label: "Blog", position: "right" },
          { to: "/work", label: "Work", position: "right" },
          { to: "/contact", label: "Contact", position: "right" },
        ],
      },
      footer: {
        style: "light",
        logo: {
          alt: "KG Logo",
          href: "/",
          src: "img/logo.png",
          height: 50,
          width: 50,
        },
        links: [
          {
            label: "GitHub",
            href: "https://github.com/kgajera",
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/kishan-gajera",
          },
          {
            label: "Twitter",
            href: "https://www.twitter.com/kgajera24",
          },
        ],
        copyright: `&copy; ${new Date().getFullYear()} Kishan Gajera. All content is the property of Kishan Gajera and KGajera.com.`,
      },

      algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        placeholder: "Search...",
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      sidebar: {
        hideable: false,
      },
    }),
};

module.exports = config;
