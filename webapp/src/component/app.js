import React from "react";
import AboutMe from "component/about-me";
import DocumentHeadContainer from "container/document-head";
import LanguageSwitch from "container/language-switch";
import MainPanelContainer from "../container/main-panel";
import "./app.scss";

export default class App extends React.Component {
  render() {
    return (
      <div id="content-container">
        <DocumentHeadContainer />

        <AboutMe />
        <MainPanelContainer />
        <LanguageSwitch />
      </div>
    );
  }
}
