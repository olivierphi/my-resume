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
        <span>{this.props.i18n.top_links["pdf.download"]}</span>
        <span>{this.props.i18n.top_links.language}</span>
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
  onLanguageSwitchClick: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    top_links: PropTypes.shape({
      language: PropTypes.string.isRequired,
      ["pdf.download"]: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
