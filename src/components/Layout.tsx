import * as React from "react";

import { LangContext } from "../contexts/LangContext";
import { RESUME_DATA } from "../data/resume-data";
import { LANG } from "../domain";
import { MainPanel } from "./MainPanel";
import { MePanel } from "./MePanel";

export function Layout(props: React.PropsWithChildren<{}>): React.ReactElement {
  const langCode = React.useContext(LangContext);

  return (
    <html lang={langCode}>
      <head>
        <meta charSet="utf8" />
        <title>{RESUME_DATA[langCode].document.meta.title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital@1&family=Ubuntu&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="css/main.css" />
      </head>
      <body className="text-black font-sans">
        <div className="max-w-5xl mx-auto flex flex-col-reverse items-stretch md:flex-row border border-black">
          <MePanel />
          <MainPanel />
        </div>
      </body>
    </html>
  );
}
