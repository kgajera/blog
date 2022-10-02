import OriginalFooter from "@theme-original/Footer";
import React from "react";
import SubscribeForm from "../components/SubscribeForm";

function Footer(props: {}) {
  return (
    <div className="footer-wrapper footer">
      <div className="container margin-top--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <h3>About Kishan Gajera</h3>I am a highly motivated and
                passionate software engineer. You'll mostly find me working with
                JavaScript on both client and server side. I strive to build web
                applications and libraries that countless people will find
                useful.
              </div>
              <img
                src="/img/headshot.jpeg"
                style={{
                  borderRadius: "50%",
                  height: 130,
                  marginLeft: 10,
                  width: 130,
                }}
              />
            </div>
            <div
              className="margin-top--lg"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <h3>Stay up to date</h3>
                <p>
                  Subscribe to the newsletter to stay up to date with my latest
                  content and work!
                </p>
                <SubscribeForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <OriginalFooter {...props} />
    </div>
  );
}

export default Footer;
