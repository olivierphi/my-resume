import React from "react";
// import PropTypes from "prop-types";
import BioContainer from "container/bio";
import LanguageSwitch from "container/language-switch";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BioContainer />
        <LanguageSwitch />
      </div>
    );
  }
}
//
// App.propTypes = {
//   active: PropTypes.bool.isRequired,
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func.isRequired
// };
