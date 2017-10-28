import { connect } from "react-redux";
import Bio from "../component/bio";

const mapStateToProps = state => {
  return {
    bio: state.currentData.bio
  };
};

const BioContainer = connect(mapStateToProps)(Bio);

export default BioContainer;
