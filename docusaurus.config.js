// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Kishan Gajera",
  tagline: "",
  url: "https://kgajera.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "kgajera",
  projectName: "blog",

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
          trackingID: "G-M8Q0EVRYPR",
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
        title: "Kishan Gajera",
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
        style: "dark",
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
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      sidebar: {
        hideable: false,
      }
    }),
};

module.exports = config;
