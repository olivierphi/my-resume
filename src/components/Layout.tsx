import * as React from "react";

import { LangContext } from "../contexts/LangContext";
import { RESUME_DATA } from "../data/resume-data";
import { LANG } from "../domain";

export function Layout(props: React.PropsWithChildren<{}>): JSX.Element {
  return (
    <LangContext.Consumer>
      {(langCode: LANG) => {
        return (
          <html lang={langCode}>
            <head>
              <meta charSet="utf8" />
              <title>{RESUME_DATA[langCode].document.meta.title}</title>
            </head>
            <body>{props.children}</body>
          </html>
        );
      }}
    </LangContext.Consumer>
  );
}
