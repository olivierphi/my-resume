import { connect } from "react-redux";
import Hobbies from "component/about-me/hobbies";

const mapStateToProps = state => {
  return {
    i18n: state.currentI18n,
  };
};

const HobbiesContainer = connect(mapStateToProps)(Hobbies);

export default HobbiesContainer;
