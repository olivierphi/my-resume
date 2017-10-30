import { connect } from "react-redux";
import Education from "component/about-me/education";

const mapStateToProps = state => {
  return {
    i18n: state.currentI18n,
  };
};

const EducationContainer = connect(mapStateToProps)(Education);

export default EducationContainer;
