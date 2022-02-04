import React from "react";
import Layout from "@theme/Layout";
import Input from "../components/Input";
import Textarea from "../components/Textarea";

const FormField = ({
  children,
  label,
  name,
}: {
  children: React.ReactChild;
  label: string;
  name: string;
}) => {
  return (
    <div className="margin-vert--lg">
      <label htmlFor={name}>{label}</label>
      <div className="margin-top--sm">{children}</div>
    </div>
  );
};

const Contact = () => {
  return (
    <Layout title="Contact">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1>Contact Me</h1>
            <form action="https://postform.com/s/kazOv8" method="POST">
              <FormField label="Your Name" name="name">
                <Input name="name" required />
              </FormField>
              <FormField label="Your Email" name="email">
                <Input name="email" required type="email" />
              </FormField>
              <FormField label="Message" name="message">
                <Textarea name="message" required rows={5} />
              </FormField>
              <button className="button button--primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
