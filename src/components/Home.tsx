import React from "react";
import Layout from "@theme/Layout";
import BlogPostItem from "@theme/BlogPostItem";
import { Content } from "@theme/BlogPostPage";

interface Props {
  readonly recentPosts: readonly { readonly content: Content }[];
}

function Home({ recentPosts }: Props): JSX.Element {
  return (
    <Layout>
      <div className="hero hero--dark hero--home shadow--lw">
        <div className="container">
          <div className="row">
            <div className="col col--9 col--offset-1">
              <h1 className="hero__title">
                👋 I'm Kishan, a software engineer.
              </h1>
              <p className="hero__subtitle">
                Welcome to my development playground.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container margin-top--xl">
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
}

export default Home;
