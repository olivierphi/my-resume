import React from "react";
import BioContainer from "container/about-me/bio";

export default class AboutMe extends React.Component {
  render() {
    return (
      <section id="about-me" itemScope itemType="http://schema.org/Person">
        <BioContainer />
      </section>
    );
  }
}
