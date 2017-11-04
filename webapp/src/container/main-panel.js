import { connect } from "react-redux";
import MainContainer from "../component/main-panel";

const mapStateToProps = state => {
  return {
    name: state.currentData.bio.name,
    punchline: state.currentData.document.punchline.digging,
    i18n: state.currentI18n,
  };
};

const MainPanelContainer = connect(mapStateToProps)(MainContainer);

export default MainPanelContainer;
