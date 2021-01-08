import * as React from "react";

import { I18N_DATA } from "../data/i18n-data";
import { LANG } from "../domain";

type HiProps = { lang: LANG };

export function Hi(props: HiProps): JSX.Element {
  return <div className="mb-1">Hello {I18N_DATA[props.lang].me.phone}</div>;
}
