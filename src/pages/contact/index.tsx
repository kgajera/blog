import React from "react";
import Layout from "@theme/Layout";
import FormField from "@site/src/components/FormField";
import NetlifyForm from "@site/src/components/NetlifyForm";

function Contact() {
  return (
    <Layout title="Contact">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1>Contact Me</h1>
            <NetlifyForm action="/contact/submitted" name="contact">
              <FormField label="Your Name" name="name" required type="text" />
              <FormField
                fieldType="input"
                label="Your Email"
                name="email"
                required
                type="email"
              />
              <input name="website" style={{ display: "none" }} />
              <FormField
                fieldType="textarea"
                label="Message"
                name="message"
                required
                rows={5}
              />
              <button
                className="button button--lg button--primary"
                type="submit"
              >
                Send
              </button>
            </NetlifyForm>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
