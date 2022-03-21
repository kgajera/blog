---
slug: end-to-end-testing-for-angular-universal
title: End-to-End Testing for Angular Universal
image: ./image.png
authors: [kgajera]
tags: [angular, angular universal, protractor]
---

I'm starting to write end-to-end tests for Angular Universal apps that are a front-end for a headless CMS. My goals are to test the basic functionalities of server-side rendering (SSR), run accessibility tests, and check if any errors are logged to the browser's console. I've seen many questions about how to test Angular Universal apps, so I wanted to share my setup.

<!--truncate-->

The tests in this example are based off a previous blog post, Using Angular as a front-end for Contentful, and the full source code can be found here: https://github.com/kgajera/javascript-examples/tree/master/examples/angular-contentful-blog

## Configuration

There are two dev dependencies to add:

```shell
npm install --save-dev @types/axe-webdriverjs axe-webdriverjs concurrently
```

- [axe-webdriverjs](https://www.npmjs.com/package/axe-webdriverjs) will be used to test accessibility
- [concurrently](https://www.npmjs.com/package/concurrently) will be used to serve the Angular app and run tests in parallel

The `serve:e2e` script needs to be added to your `package.json` which will be used to run the tests. The script will start the SSR server and then run the tests against it.

```json title="package.json"
{
  "name": "angular-contentful-blog",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "dev:ssr": "ng run angular-contentful-blog:serve-ssr",
    "serve:ssr": "node dist/angular-contentful-blog/server/main.js",
    "build:ssr": "ng build --prod && ng run angular-contentful-blog:server:production",
    "prerender": "ng run angular-contentful-blog:prerender",
    "serve:e2e": "npm run build:ssr && concurrently \"npm run serve:ssr\" \"npm run e2e\" --kill-others --success first"
  },
  "dependencies": {
    ...
  },
  "devDependencies": {
    ...
  }
}
```

To support running the `serve:e2e` script, the `e2e` target in `angular.json` needs to be configured as shown below:

```json title="angular.json"
{
  "projects": {
    "angular-contentful-blog": {
      "architect": {
        ...
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "baseUrl": "http://localhost:4000"
          }
        },
       ...
      }
    }},
}
```

With this, the tests can be run using the following command:

```shell
npm run serve:e2e
```

## Page Objects

Using page objects to separate test and page specific logic is a common design pattern for end-to-end tests. The page object will provide ways to access DOM elements and perform UI interactions. This helps write cleaner tests because much of the logic has been encapsulated in reusable page objects. If your UI changes in the future, the page objects will require changes and the tests should not.

Below is an object representing a universal rendered page. This class could be used directly or as a "base" class that can be extended to provide additional page specific logic.

```ts title="/e2e/src/universal.po.ts"
import * as AxeBuilder from "axe-webdriverjs";
import * as fs from "fs";
import {
  ElementFinder,
  browser,
  by,
  element,
  logging,
  promise,
} from "protractor";

export class UniversalPage {
  /**
   * Key value store that is transferred from the application on
   * the server side to the application on the client side.
   */
  private transferStateStore: Record<string, any>;

  constructor(private url: string) {}

  /**
   * Returns accessibility report
   */
  analyzeAccessibility(): Promise<AxeBuilder.AxeAnalysis> {
    return (AxeBuilder as any)(browser).analyze();
  }

  /**
   * Returns the document title
   */
  getDocumentTitle(): promise.Promise<string> {
    return browser.getTitle();
  }

  /**
   * Returns the text of the `h1` element
   */
  getHeading1Text(): promise.Promise<string> {
    return element(by.tagName("h1")).getText();
  }

  /**
   * Returns browser log entries
   *
   * @param level Return logs equal to this level or greater
   */
  async getLogEntries(
    level: logging.Level = logging.Level.SEVERE
  ): promise.Promise<logging.Entry[]> {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    return logs.filter((log) => log.level.value >= level.value);
  }

  /**
   * Returns the `content` attribute value for a meta tag
   *
   * @param name The `name` attribute value to find the meta tag element
   */
  getMetaContent(name: string): promise.Promise<string> {
    return element(by.css(`meta[name=${name}]`)).getAttribute("content");
  }

  /**
   * Returns the key value store that is transferred from the application on
   * the server side to the application on the client side.
   */
  getTransferStateStore(): Record<string, any> {
    return this.transferStateStore;
  }

  /**
   * Returns a transfer state value by key
   *
   * @param key A key or partial key to access the value
   */
  getTransferStateStoreValue(key: string): any | null {
    if (!this.transferStateStore) {
      return null;
    }
    if (this.transferStateStore[key]) {
      return this.transferStateStore[key];
    }
    // Attempt to find a partial key match
    for (const k in this.transferStateStore) {
      if (k.includes(key)) {
        return this.transferStateStore[k];
      }
    }
    return null;
  }

  /**
   * Navigate to the url this page was constructed with
   */
  async navigate(): Promise<void> {
    await browser.get(this.url);
    await this.setTransferStateStore();
  }

  /**
   * Returns the screenshot file path
   *
   * @param filename Name of file without extension
   */
  async saveScreenshot(filename: string): Promise<string> {
    const directory = "coverage/e2e_screenshots";
    const filePath = `${directory}/${filename}.png`;

    // Screenshot as a base-64 encoded PNG
    const screenshot = await browser.takeScreenshot();

    // Create directory if it does not exit
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Save file
    const stream = fs.createWriteStream(filePath);
    stream.write(Buffer.from(screenshot, "base64"));
    stream.end();

    return filePath;
  }

  /**
   * Find the script element containing the transfer state key value store and
   * parse into a JSON object
   */
  private async setTransferStateStore(): Promise<void> {
    // This id uses the "serverApp" prefix because it is specified in app.module.ts
    const cacheScript: ElementFinder = await element(by.id("serverApp-state"));
    const rawValue: string = await cacheScript.getAttribute("textContent");
    this.transferStateStore = JSON.parse(unescapeHtml(rawValue));
  }
}

/**
 * Unescape the transfer state store so it can be parsed into JSON
 *
 * Copied from https://github.com/angular/angular/blob/master/packages/platform-browser/src/browser/transfer_state.ts#L23
 */
function unescapeHtml(text: string): string {
  const unescapedText: { [k: string]: string } = {
    "&a;": "&",
    "&q;": '"',
    "&s;": "'",
    "&l;": "<",
    "&g;": ">",
  };
  return text.replace(/&[^;]+;/g, (s) => unescapedText[s]);
}
```

This class contains methods to do the following:

- Access common DOM elements such as the document title, meta tags, and the h1 element
- Access the [transfer state](https://angular.io/api/platform-browser/TransferState) store. This is data transferred by the server-side application to the client-side application. Usually, these will be responses to API requests made by your server-side application that don't need to be duplicated by the client.
- Analyze the accessibility of the page by running a number of tests: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
- Get the browser's console log entries
- Save a screenshot of the page to the `/coverage/e2e_screenshots` directory.

## Writing Tests

Using the `UniversalPage` object, tests can now be written for the [`BlogPostComponent`](https://github.com/kgajera/javascript-examples/blob/master/examples/angular-contentful-blog/src/app/blog-post/blog-post.component.ts):

```ts title="/e2e/src/blog-post/blog-post.e2e-spec.ts"
import { BlogPost } from "../../../src/app/contentful/blog-post";
import { UniversalPage } from "../universal.po";

const POST_SLUGS = ["post-1", "post-2"];

for (const slug of POST_SLUGS) {
  describe(`blog post: ${slug}`, () => {
    let page: UniversalPage;
    let blogPost: BlogPost;

    beforeAll(async () => {
      // Initialize the page object and navigate to it
      page = new UniversalPage(slug);
      await page.navigate();

      // Get the blog post data returned by Contentful's API from the transfer state store.
      // This is the expected data/model to be used in the page's DOM.
      blogPost = page.getTransferStateStoreValue(`slug=${slug}`)?.body.items[0]
        .fields;

      // Take screenshot
      await page.saveScreenshot(slug);
    });

    it("should have blog post data in transfer state store", () => {
      expect(blogPost).toBeDefined();
    });

    it("should have set document title", () => {
      expect(page.getDocumentTitle()).toBe(blogPost.title);
    });

    it("should have h1 text", () => {
      expect(page.getHeading1Text()).toBe(blogPost.title);
    });

    it("should have SEO meta tags", () => {
      expect(page.getMetaContent("description")).toBe(blogPost.excerpt);
      expect(page.getMetaContent("keywords")).toBe(blogPost.keywords.join(","));
    });

    it("should have no accessibility violations", async () => {
      const results = await page.analyzeAccessibility();
      expect(results.violations.length).toBe(0);
    });

    it("should have no errors in browser logs", async () => {
      const entries = await page.getLogEntries();
      expect(entries.length).toBe(0);
    });
  });
}
```

Notice that we're looping over blog posts slugs/URLs and running tests against each page. In this example, the slugs are hard-coded but a sitemap or CMS API could be used to get all blog post URLs. The tests themselves are pretty self-explanatory and you can see how using a page object simplifies the test logic. The `blogPost` variable contains data stored in the CMS and is expected to be in the page's DOM. Instead of fetching it using the API, we're using the cached version in the transfer state store.

And here's an example of extending the `UniversalPage` to provide more page specific methods to test the [`BlogPostListComponent`](https://github.com/kgajera/javascript-examples/blob/master/examples/angular-contentful-blog/src/app/blog-post-list/blog-post-list.component.ts) page:

```ts title="/e2e/src/blog-post-list/blog-post-list.po.ts"
import { ElementArrayFinder, ElementFinder, by, element } from "protractor";

import { UniversalPage } from "../universal.po";

export class BlogPostListPage extends UniversalPage {
  getBlogPostListItems(): ElementArrayFinder {
    return element.all(by.tagName("article"));
  }

  getBlogPostLink(slug: string): ElementFinder {
    return element(by.css(`a[href=/${slug}]`));
  }
}
```

```ts title="/e2e/src/blog-post-list/blog-post-list.e2e-spec.ts"
import { Entry } from "contentful";

import { BlogPost } from "../../../src/app/contentful/blog-post";
import { BlogPostListPage } from "./blog-post-list.po";

describe("blog post list", () => {
  let page: BlogPostListPage;
  let blogPosts: Entry<BlogPost>[];

  beforeAll(async () => {
    page = new BlogPostListPage("/");
    await page.navigate();

    // Get the blog posts data returned by Contentful's API from the transfer state store.
    // This is the expected data/model to be used in the page's DOM.
    blogPosts = page.getTransferStateStoreValue("content_type=blogPost")?.body
      .items;

    await page.saveScreenshot("index");
  });

  it("should have blog posts data in transfer state store", () => {
    expect(blogPosts).toBeDefined();
  });

  it("should have title", () => {
    expect(page.getHeading1Text()).toBe("Blog Posts");
  });

  it("should list blog posts", async () => {
    const blogPostElements = await page.getBlogPostListItems();
    expect(blogPostElements.length).toBe(blogPosts.length);
  });

  it("should contain link to each blog post", () => {
    for (const blogPost of blogPosts) {
      expect(page.getBlogPostLink(blogPost.fields.slug)).toBeDefined();
    }
  });

  it("should have no accessibility violations", async () => {
    const results = await page.analyzeAccessibility();
    expect(results.violations.length).toBe(0);
  });

  it("should have no errors in browser logs", async () => {
    const entries = await page.getLogEntries();
    expect(entries.length).toBe(0);
  });
});
```

## What's next?

Our tests so far are simple, yet they ensure Angular SSR is working as expected, every page meets accessibility standards and is error free. Here are examples of other kinds of tests that could be implemented:

- Test user interactions such as clicking on an element or submitting a form
- In addition to Chrome, run tests in other browsers
- Run tests on different window sizes to test responsive elements

As I write tests, I'm often amazed at the level of automation available to us. Please share your thoughts and ideas for end-to-end testing!
