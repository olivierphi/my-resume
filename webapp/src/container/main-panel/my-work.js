import { connect } from "react-redux";
import MyWork from "component/main-panel/my-work";

const mapStateToProps = state => {
  return {
    i18n: state.currentI18n,
    myWork: state.currentData.myWork,
  };
};

const MyWorkContainer = connect(mapStateToProps)(MyWork);

export default MyWorkContainer;
