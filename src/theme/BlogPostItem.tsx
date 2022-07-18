import React from "react";
import Head from "@docusaurus/Head";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { Props } from "@theme/BlogPostItem";
import OriginalBlogPostItem from "@theme-original/BlogPostItem";
import TwitterLink from "../components/TwitterLink";
import Giscus from "@giscus/react";

export default function BlogPostItem(props: Props) {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();

  if (props.truncated) {
    return <OriginalBlogPostItem {...props} />;
  }

  return (
    <>
      <Head>
        <title>{props.metadata.title}</title>
      </Head>
      <OriginalBlogPostItem {...props} />
      <div className="margin-vert--xl">
        <Giscus
          id="comments"
          repo={`${siteConfig.organizationName}/${siteConfig.projectName}`}
          repoId={siteConfig.customFields.projectId as string}
          category={siteConfig.customFields.discussionCategory as string}
          categoryId={siteConfig.customFields.discussionCategoryId as string}
          mapping="specific"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme={colorMode}
          lang="en"
          loading="lazy"
        />
      </div>
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
      </div>
    </>
  );
}
