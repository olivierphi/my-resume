import { connect } from "react-redux";
import Teaching from "component/about-me/teaching";

const mapStateToProps = state => {
  return {
    i18n: state.currentI18n,
  };
};

const TeachingContainer = connect(mapStateToProps)(Teaching);

export default TeachingContainer;
