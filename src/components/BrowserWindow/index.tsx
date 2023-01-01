import React, { type ReactNode } from "react";
import IconExternalLink from "@theme/Icon/ExternalLink";

import styles from "./styles.module.css";

interface BrowserWindowProps {
  children: ReactNode;
  url: string;
}

export function BrowserWindow({
  children,
  url = "http://localhost:3000",
}: BrowserWindowProps): JSX.Element {
  return (
    <div className={styles.browserWindow}>
      <div className={styles.browserWindowHeader}>
        <div className={styles.buttons}>
          <span className={styles.dot} style={{ background: "#f25f58" }} />
          <span className={styles.dot} style={{ background: "#fbbe3c" }} />
          <span className={styles.dot} style={{ background: "#58cb42" }} />
        </div>
        <div className={styles.browserWindowAddressBar}>
          <a href={url} target="_blank">
            {url}
          </a>
        </div>
        <div className={styles.browserWindowMenuIcon}>
          <div className="dropdown dropdown--hoverable dropdown--right">
            <div data-toggle="dropdown">
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </div>
            <ul className="dropdown__menu">
              <li>
                <a className="dropdown__link" href={url} target="_blank">
                  Visit Site <IconExternalLink />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.browserWindowBody}>{children}</div>
    </div>
  );
}
