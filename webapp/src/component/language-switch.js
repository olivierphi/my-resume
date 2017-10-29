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
        {["en", "fr"].map(lang => (
          <SwitchLink
            key={lang}
            btnLang={lang}
            currentLang={this.props.currentLang}
            onClick={this.onClick}
          />
        ))}
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

class SwitchLink extends React.PureComponent {
  render() {
    return this.props.currentLang != this.props.btnLang ? (
      <a
        href={`/${this.props.btnLang}`}
        onClick={this.props.onClick.bind(null, this.props.btnLang)}
      >
        {this.props.btnLang.toUpperCase()}
      </a>
    ) : (
      <span>{this.props.btnLang.toUpperCase()}</span>
    );
  }
}

SwitchLink.propTypes = {
  currentLang: PropTypes.string.isRequired,
  btnLang: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
