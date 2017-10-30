import { connect } from "react-redux";
import Languages from "component/about-me/languages";

const mapStateToProps = state => {
  return {
    currentLang: state.currentLang,
    i18n: state.currentI18n,
  };
};

const LanguagesContainer = connect(mapStateToProps)(Languages);

export default LanguagesContainer;
