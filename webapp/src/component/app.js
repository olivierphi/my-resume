import React from "react";
import AboutMe from "component/about-me";
import DocumentHeadContainer from "container/document-head";
import LanguageSwitch from "container/misc/language-switch";
import MainPanelContainer from "../container/main-panel";
import GitHubRibbon from "../component/misc/github-ribbon";
import "./app.scss";

export default class App extends React.Component {
  render() {
    return [
      <GitHubRibbon key="gitHubRibbon" />,
      <div id="content-container" key="contentContainer">
        <DocumentHeadContainer />

        <AboutMe />
        <MainPanelContainer />
        <LanguageSwitch />
      </div>,
    ];
  }
}
