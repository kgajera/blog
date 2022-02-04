import OriginalFooter from "@theme-original/Footer";
import React from "react";

export default function Footer(props) {
  return (
    <div className="footer-wrapper footer--dark">
      <div className="container margin-top--lg">
        <div className="row">
          <div className="col col--6 col--offset-2">
            <h3>About Kishan Gajera</h3>I am a highly motivated and passionate
            full-stack web developer. You'll mostly find me working with
            JavaScript on both client and server side. I strive to build web
            applications and libraries that countless people will find useful.
          </div>
          <div className="col col--4">
            <img
              src="/img/headshot.jpeg"
              style={{
                borderRadius: "50%",
                maxWidth: 140,
              }}
            />
          </div>
        </div>
      </div>
      <OriginalFooter {...props} />
    </div>
  );
}
