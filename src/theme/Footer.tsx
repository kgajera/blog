import OriginalFooter from "@theme-original/Footer";
import React from "react";

function Footer(props) {
  return (
    <div className="footer-wrapper footer--dark">
      <div className="container margin-vert--lg">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ flexGrow: 1, maxWidth: 650 }}>
            <h3>About Kishan Gajera</h3>I am a highly motivated and passionate
            software engineer. You'll mostly find me working with JavaScript on
            both client and server side. I strive to build web applications and
            libraries that countless people will find useful.
          </div>
          <img
            src="/img/headshot.jpeg"
            style={{
              borderRadius: "50%",
              height: 120,
              marginLeft: 10,
              width: 120,
            }}
          />
        </div>
      </div>
      <OriginalFooter {...props} />
    </div>
  );
}

export default Footer;
