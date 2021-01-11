import * as React from "react";

import { LangContext } from "../contexts/LangContext";
import { RESUME_DATA } from "../data/resume-data";

export function MainPanel(props: {}): React.ReactElement {
  const langCode = React.useContext(LangContext);

  return (
    <section id="main" className="pl-5">
      <h1 className="text-6xl">{RESUME_DATA[langCode].bio.name}</h1>
      <h2 className="text-3xl my-6 font-serif text-red italic">{RESUME_DATA[langCode].document.punchline}</h2>
    </section>
  );
}
