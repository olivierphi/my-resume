import React from "react";
import PropTypes from "prop-types";
import HeaderIcon from "component/misc/header-icon";
import LanguagesIcon from "../../../assets/img/icons/header-icons/chat.svg";

const Languages = props => {
  const languagesToDisplay =
    props.currentLang === "en"
      ? ["english", "french", "spanish"]
      : ["english", "spanish"];

  return (
    <section className="languages-container">
      <HeaderIcon icon={LanguagesIcon} alt="languages" />

      <h3>{props.i18n.languages.title}</h3>

      {languagesToDisplay.map(lang => (
        <p key={lang}>{props.i18n.languages[lang]}</p>
      ))}
    </section>
  );
};

Languages.propTypes = {
  currentLang: PropTypes.string.isRequired,
  i18n: PropTypes.shape({
    languages: PropTypes.shape({
      title: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired,
      spanish: PropTypes.string.isRequired,
      french: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Languages;
