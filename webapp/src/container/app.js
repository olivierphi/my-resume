import React from "react";
import AboutMe from "component/about-me";
import DocumentHeadContainer from "container/document-head";
import LanguageSwitch from "container/language-switch";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <DocumentHeadContainer />

        <AboutMe />
        <LanguageSwitch />
      </div>
    );
  }
}
