import { connect } from "react-redux";
import OpenSource from "component/about-me/open-source";

const mapStateToProps = state => {
  return {
    openSource: {
      githubId: state.currentData.bio.githubId,
    },
    i18n: state.currentI18n,
  };
};

const OpenSourceContainer = connect(mapStateToProps)(OpenSource);

export default OpenSourceContainer;
