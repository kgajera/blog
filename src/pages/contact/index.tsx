import React from "react";
import Layout from "@theme/Layout";
import FormField from "../../components/FormField";

function Contact() {
  return (
    <Layout title="Contact">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1>Contact Me</h1>
            <form action="https://postform.com/s/kazOv8" method="POST">
              <FormField label="Your Name" name="name" required />
              <FormField
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
              <button className="button button--primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
