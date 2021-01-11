import * as React from "react";

import { LangContext } from "../contexts/LangContext";
import { RESUME_DATA } from "../data/resume-data";
import { LANG } from "../domain";
import { Layout } from "./Layout";

type ResumeProps = { lang: LANG };

export function Resume(props: ResumeProps): React.ReactElement {
  return (
    <LangContext.Provider value={props.lang}>
      <Layout>
        <div className="mb-1">Hello {RESUME_DATA[props.lang].bio.phoneNumber}</div>
      </Layout>
    </LangContext.Provider>
  );
}
