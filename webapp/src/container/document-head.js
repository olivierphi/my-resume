import { connect } from "react-redux";
import DocumentHead from "component/document-head";

const mapStateToProps = state => {
  return {
    currentLang: state.currentLang,
    document: state.currentData.document,
    buildTime: state.buildTime,
  };
};

const DocumentHeadContainer = connect(mapStateToProps)(DocumentHead);

export default DocumentHeadContainer;
