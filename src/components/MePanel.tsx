import * as React from "react";
import { MeBio } from "./Me/Bio";

export function MePanel(props: {}): React.ReactElement {
  return (
    <section id="about-me" itemScope itemType="http://schema.org/Person" className="text-white md:w-1/4 bg-red">
      <MeBio />
    </section>
  );
}
