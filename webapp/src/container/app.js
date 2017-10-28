import React from "react";
import AboutMe from "component/about-me";
import LanguageSwitch from "container/language-switch";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AboutMe />
        <LanguageSwitch />
      </div>
    );
  }
}
