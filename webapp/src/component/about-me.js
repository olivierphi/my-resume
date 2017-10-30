import React from "react";
import BioContainer from "container/about-me/bio";
import OpenSourceContainer from "container/about-me/open-source";
import EducationContainer from "container/about-me/education";
import Language from "container/about-me/languages";
import Hobbies from "container/about-me/hobbies";
import Teaching from "container/about-me/teaching";
import "./about-me.scss";

export default class AboutMe extends React.Component {
  render() {
    return (
      <section id="about-me" itemScope itemType="http://schema.org/Person">
        <div className="logo-container">
          <span className="rougemine-logo" />
          <a href="http://rougemine.com" target="_blank">
            rougemine.com
          </a>
        </div>
        <BioContainer />
        <OpenSourceContainer />
        <EducationContainer />
        <Language />
        <Hobbies />
        <Teaching />
      </section>
    );
  }
}
