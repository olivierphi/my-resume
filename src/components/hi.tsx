import * as React from "react";
import { LangContext } from "../contexts/LangContext";

import { I18N_DATA } from "../data/i18n-data";
import { RESUME_DATA } from "../data/resume-data";
import { LANG } from "../domain";

type ResumeProps = { lang: LANG };

export function Resume(props: ResumeProps): JSX.Element {
  return (
    <LangContext.Provider value={props.lang}>
      <div className="mb-1">Hello {RESUME_DATA[props.lang].bio.phoneNumber}</div>
    </LangContext.Provider>
  );
}
