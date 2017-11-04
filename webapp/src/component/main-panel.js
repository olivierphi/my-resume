import React from "react";
import { PropTypes } from "prop-types";
import SkillsContainer from "../container/main-panel/skills";
import "./main-panel.scss";

export default class MainPanel extends React.PureComponent {
  render() {
    return (
      <section id="main-panel">
        <h1>{this.props.name}</h1>
        <h2>{this.props.punchline}</h2>

        <SkillsContainer />
      </section>
    );
  }
}

MainPanel.propTypes = {
  name: PropTypes.string.isRequired,
  punchline: PropTypes.string.isRequired,
};
