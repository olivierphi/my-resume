import React from "react";
import PropTypes from "prop-types";

export default class LanguageSwitch extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div className="language-selector">
        <span>language:</span>
        {this.props.currentLang == "fr" ? (
          <a href="/en" onClick={this.onClick.bind(null, "en")}>
            EN
          </a>
        ) : (
          <span>EN</span>
        )}
        {this.props.currentLang == "en" ? (
          <a href="/fr" onClick={this.onClick.bind(null, "fr")}>
            FR
          </a>
        ) : (
          <span>FR</span>
        )}
      </div>
    );
  }

  onClick(lang, event) {
    event.preventDefault();
    this.props.onLanguageSwitchClick(lang);
  }
}

LanguageSwitch.propTypes = {
  currentLang: PropTypes.string.isRequired,
  onLanguageSwitchClick: PropTypes.func.isRequired
};
