import { connect } from "react-redux";
import Bio from "component/about-me/bio";

const mapStateToProps = state => {
  return {
    bio: state.currentData.bio,
    i18n: state.currentI18n,
  };
};

const BioContainer = connect(mapStateToProps)(Bio);

export default BioContainer;
