import React from "react";
import Head from "@docusaurus/Head";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Footer from "@theme-original/BlogPostItem/Footer";
import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";
import { TwitterLink } from "../../../components/TwitterLink";

export default function FooterWrapper(props: {}) {
  const { siteConfig } = useDocusaurusContext();
  const { metadata, isBlogPostPage } = useBlogPost();
  const { colorMode } = useColorMode();

  if (!isBlogPostPage || metadata.source.match(/blog-work/)) {
    return <Footer {...props} />;
  }

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <Footer {...props} />
      <div className="margin-vert--xl">
        <Giscus
          id="comments"
          repo={`${siteConfig.organizationName}/${siteConfig.projectName}`}
          repoId={siteConfig.customFields.giscusProjectId as string}
          category={siteConfig.customFields.giscusDiscussionCategory as string}
          categoryId={
            siteConfig.customFields.giscusDiscussionCategoryId as string
          }
          mapping="title"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme={colorMode}
          lang="en"
          loading="eager"
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
            `${siteConfig.url}${metadata.permalink}`
          )}&text=${encodeURIComponent(
            `I just read "${metadata.title}" by @kgajera24`
          )}`}
          title="Share on Twitter"
        />
      </div>
    </>
  );
}
