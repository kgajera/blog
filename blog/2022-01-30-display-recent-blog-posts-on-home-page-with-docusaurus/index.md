---
slug: display-recent-blog-posts-on-home-page-with-docusaurus
title: Display Recent Blog Posts on Home Page with Docusaurus 2.0.0-beta.16
image: ./image.png
authors: [kgajera]
tags: [docusaurus]
---

I've found [Docusaurus](https://docusaurus.io) to be a great tool for both documentation sites as well as blogs because it provides great functionality out of the box and lets you focus on your site's content. I'm in the process of migrating a few sites over to it. A common feature for the sites I'm building is to display a list of recent blog posts on the home page. Unfortunately, there isn't a straight forward path to do this.<!--truncate--> After much digging, here are the step's that I've taken to implement this:

1. Extend Docusaurus' default [blog plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog) to allow the following:
   - Access blog posts data
   - Add a route and component for the home page
   - Pass recent blog post data as props to the home page component
2. Implement component for home page

## Home page component

First, let's stub out our home page component:

```tsx title="/src/components/Home.tsx"
import React from "react";
import Layout from "@theme/Layout";

const Home = () => {
  return <Layout>This is the home page!</Layout>;
};
```

:::note
We will be defining the home page route within the blog plugin so this component should **not** be added in the `src/pages/` folder.

You also should not have a `src/pages/index.tsx` file as this will cause duplicate home page routes.
:::

At this point, there's no way to view the `Home` component that we've stubbed out in the UI and that's expected. We will come back to the implementation after extending the default blog plugin as this will automatically pass the necessary props to this component.

## Extend the default blog plugin

Docusaurus has an [official blog plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog) that we will be extending. The Docusaurus plugin API offers [lifecycle hooks](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis) that we can leverage to do post-processing on the blog posts data from the default plugin. We will specifically be overriding the `contentLoaded` hook to get the 5 most recent posts.

Here's a documented example of our blog plugin:

```js title="/plugins/blog-plugin.js"
const blogPluginExports = require("@docusaurus/plugin-content-blog");

const defaultBlogPlugin = blogPluginExports.default;

async function blogPluginExtended(...pluginArgs) {
  const blogPluginInstance = await defaultBlogPlugin(...pluginArgs);

  return {
    // Add all properties of the default blog plugin so existing functionality is preserved
    ...blogPluginInstance,
    /**
     * Override the default `contentLoaded` hook to access blog posts data
     */
    contentLoaded: async function (data) {
      // Get the 5 latest blog posts
      const recentPosts = [...data.content.blogPosts].splice(0, 5);

      data.actions.addRoute({
        // Add route for the home page
        path: "/",
        exact: true,

        // The component to use for the "Home" page route
        component: "@site/src/components/Home.tsx",

        // These are the props that will be passed to our "Home" page component
        modules: {
          recentPosts: recentPosts.map((post) => ({
            content: {
              __import: true,
              // The markdown file for the blog post will be loaded by webpack
              path: post.metadata.source,
              query: {
                truncated: true,
              },
            },
          })),
        },
      });

      // Call the default overridden `contentLoaded` implementation
      return blogPluginInstance.contentLoaded(data);
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginExtended,
};
```

From this implementation, you can see how all the existing functionality from the default blog plugin is still preserved. We're simply overriding the `contentLoaded` hook to do our post-processing then calling the `contentedLoaded` implementation of the default plugin.

Now that the plugin is implemented, we need to configure Docusaurus to use it and disable the default blog plugin:

```js title="docusaurus.config.js"
const config = {
  ...
  presets: [
    [
      "classic",
      ({
        // Disable default blog plugin
        blog: false,
        ...
      }),
    ],
  ],
  plugins: [
    // Use custom blog plugin
    [
      "./plugins/blog-plugin",
      {
        id: "blog",
        routeBasePath: "blog",
        path: "./blog",

      },
    ],
    ...
  ],
  ...
};
```

## Implement the home page component

Based on our custom blog plugin, we can expect our `Home` component to be passed the `recentPosts` prop. We can map the `recentPosts` collection to display them in our UI.

In this example implementation, we're creating an identical blog post list display used on the default `/blog` route by resusing the `BlogPostItem` component:

```tsx title="/src/components/Home.tsx"
import React from "react";
import Layout from "@theme/Layout";
import BlogPostItem from "@theme/BlogPostItem";
import { Content } from "@theme/BlogPostPage";

interface Props {
  readonly recentPosts: readonly { readonly content: Content }[];
}

const Home = ({ recentPosts }: Props) => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col col--9 col--offset-1">
            {recentPosts.map(({ content: BlogPostContent }) => (
              <BlogPostItem
                key={BlogPostContent.metadata.permalink}
                frontMatter={BlogPostContent.frontMatter}
                assets={BlogPostContent.assets}
                metadata={BlogPostContent.metadata}
                truncated={BlogPostContent.metadata.truncated}
              >
                <BlogPostContent />
              </BlogPostItem>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
```

If you don't want to use the default theme component, I'd suggest looking at their [`BlogPostItem`](https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/BlogPostItem/index.tsx) implementation as a starting point to build your custom component.
