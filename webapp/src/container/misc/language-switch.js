import { connect } from "react-redux";
import { switchLanguage } from "../../actions";
import LanguageSwitch from "../../component/misc/language-switch";

const mapStateToProps = state => {
  return {
    currentLang: state.currentLang,
    i18n: state.currentI18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLanguageSwitchClick: newlang => {
      dispatch(switchLanguage(newlang));
    },
  };
};

const LanguageSwitchContainer = connect(mapStateToProps, mapDispatchToProps)(
  LanguageSwitch
);

export default LanguageSwitchContainer;
