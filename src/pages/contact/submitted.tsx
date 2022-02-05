import React from "react";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

const ContactSubmitted = () => {
  return (
    <Layout title="Message Received">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <Heading as="h1">Thanks for your message!</Heading>
            <p>I've received your message and will be in touch soon.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactSubmitted;
