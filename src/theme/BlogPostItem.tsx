import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import OriginalBlogPostItem from "@theme-original/BlogPostItem";
import type { Props } from "@theme/BlogPostItem";
import TwitterLink from "../components/TwitterLink";
import Head from "@docusaurus/Head";

export default function BlogPostItem(props: Props) {
  const { siteConfig } = useDocusaurusContext();

  if (props.truncated) {
    return <OriginalBlogPostItem {...props} />;
  }

  return (
    <>
      <Head>
        <title>{props.metadata.title}</title>
      </Head>
      <OriginalBlogPostItem {...props} />
      <div
        className="margin-vert--lg"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TwitterLink
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            `${siteConfig.url}${props.metadata.permalink}`
          )}&text=${encodeURIComponent(
            `I just read "${props.metadata.title}" by @kgajera`
          )}`}
          title="Share on Twitter"
        />
        <TwitterLink
          href={`https://twitter.com/search?q=${encodeURIComponent(
            `${siteConfig.url}${props.metadata.permalink}`
          )}`}
          title="Discuss on Twitter"
        />
      </div>
    </>
  );
}
