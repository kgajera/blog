---
slug: dynamic-sitemap-for-angular-universal-and-contentful
title: Dynamic Sitemap for Angular Universal and Contentful
image: ./image.png
authors: [kgajera]
tags: [angular, angular universal, contentful]
---

A sitemap is a file that provides search engines data about the pages of your site. If you're using a content management system (CMS), your sitemap needs to be kept up to date as you add new content/pages. In this post, we'll look at how we can create a dynamic sitemap using Angular Universal and Contentful. However, this approach could be applied to any Node.js project. The sitemap will be dynamic because it will be generated from content stored in Contentful.

<!--truncate-->

This post builds on my previous post, [Using Angular as a front-end for Contentful](blog/using-angular-as-a-front-end-for-contentful), so you should already have an Angular Universal project that runs on a Node.js Express server. And your environment file should contain the following properties:

```ts title="/src/environments/environment.ts"
export const environment = {
  production: false,
  // Contentful API authentication credentials
  contentful: {
    space: "vcdjjbl2zaex",
    accessToken: "xG-Ei5PrA5Dz-dr7kaKwSUMHe0UGXUzP690e4QGtSbE",
  },
  // URL where this app is hosted
  hostUrl: "http://localhost:4200",
};
```

Full source code is located here: https://github.com/kgajera/javascript-examples/tree/master/examples/angular-contentful-blog

## Add Express endpoint for the sitemap

When you installed Angular Universal, it generated a `server.ts` file at the root of your project. This file contains a function, `app`, that configures the Express application and this is where our implementation will occur.

An [Express endpoint](https://expressjs.com/en/guide/routing.html) consists of a route path and a route handler function. For our sitemap endpoint, `/sitemap.xml` will be the path. When a GET request is made to this endpoint, the handler function will be responsible for sending the sitemap XML as the response. This function will use the [sitemap](https://github.com/ekalinin/sitemap.js) library to create the sitemap XML so let's install it: `npm install --save sitemap`

Here's the documented implementation of our sitemap function:

```ts title="server.ts"
async function sitemap(req: Request, res: Response) {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");

  try {
    const sitemapStream = new SitemapStream({
      // This is required because we will be adding sitemap entries using relative URLs
      hostname: environment.hostUrl,
    });
    const pipeline = sitemapStream.pipe(createGzip());

    // Fetch blog posts from Contentful
    const blogPostCollection: EntryCollection<{
      slug: string;
    }> = await contentfulClientApi.getEntries({
      content_type: "blogPost",
      limit: 1000,
    });

    for (const entry of blogPostCollection.items) {
      /**
       * For each blog post, add a new sitemap item. The Angular app contains
       * a route that uses the blog post's slug as a route parameter. So the
       * 'url' value will be the slug and is a relative URL that matches our
       * Angular route.
       */
      sitemapStream.write({
        changefreq: EnumChangefreq.MONTHLY,
        lastmod: entry.sys.updatedAt,
        priority: 0.7,
        url: entry.fields.slug,
      } as SitemapItem);
    }

    // Add any other sitemap items for other pages of your site
    sitemapStream.write({
      changefreq: EnumChangefreq.DAILY,
      priority: 1,
      url: "",
    } as SitemapItem);

    // Stream write the response
    sitemapStream.end();
    pipeline.pipe(res).on("error", (error: Error) => {
      throw error;
    });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
```

Now let's add the route to our Express application in the `app` function:

```
server.get('/sitemap.xml', sitemap);
```

We're using the `get` method because it corresponds to the HTTP GET method, and with parameters specifying the path and our `sitemap` callback function.

The order in which you add routes to your Express application **does** matter. When a request is made, it's possible for it to match multiple routes you've defined. In this case, only the first route matched will be used. I point this out because Angular Universal defines a route which uses a regular expression for the path, \*, that will match all requests and use the Angular app to render the response. The sitemap route should be defined before this. If you define the sitemap route after it, the sitemap callback function will not be called because the Angular app will have rendered the response.

After running the project, `npm run dev:ssr`, navigate to `http://localhost:4200/sitemap.xml` to see the sitemap:

## Sitemap and Search Engines

We have our sitemap endpoint, but how will search engines know about it? One option is to manually submit it to search engines. For example, you can submit your sitemap to Google through their [Search Console](https://search.google.com/search-console). Another option is to use a robots.txt file to allow our sitemap to be discovered. Let's create this file directly in the `src` directory:

```txt title="robots.txt"
User-agent: *
Disallow:
Sitemap: http://localhost:4200/sitemap.xml
```

This configuration allows all robots to access all URLs of our site and also specifies the location of our sitemap. For more information, see http://www.robotstxt.org/robotstxt.html

We need this file to be included in our build, so add it to the assets array of the build target in angular.json. Navigating to `http://localhost:4200/robots.txt` should display our file.

## What's next?

Your sitemap will grow over time and eventually performance will become a concern. How you decide to handle this should depend on the size of your sitemap and frequency of content changes.

- Cache the response in memory - This should be used for smaller sitemaps. The first time the sitemap function is executed, it will generate the sitemap and store it in a module scoped variable. Subsequent executions will return the variable containing the cached sitemap.
- Generate the sitemap file during the build process - Use this for sitemaps that do not require frequent updates. In this approach, you run a script to generate and save the sitemap XML as a file when building the project. You can then serve this file as an asset like we are doing with the robots.txt file.
- Regenerate the sitemap anytime content is added - This can be used in tandem with the two approaches above. The idea here is that anytime content is added, you would reset the cache variable or regenerate the saved XML file. Contentful provides webhooks that can facilitate this process.

Comments, questions, and other SEO considerations are welcome.
