import { connect } from "react-redux";
import Bio from "../component/bio";

const mapStateToProps = state => {
  return state.bio;
};

const BioContainer = connect(mapStateToProps)(Bio);

export default BioContainer;
