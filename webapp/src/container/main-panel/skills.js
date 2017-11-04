import { connect } from "react-redux";
import Skills from "component/main-panel/skills";

const mapStateToProps = state => {
  return {
    i18n: state.currentI18n,
    technologies: {
      mainTechnologies: state.currentData.technologies.main,
      otherTechnologies: state.currentData.technologies.others,
    },
  };
};

const SkillsContainer = connect(mapStateToProps)(Skills);

export default SkillsContainer;
