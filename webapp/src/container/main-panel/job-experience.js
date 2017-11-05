import { connect } from "react-redux";
import JobExperience from "component/main-panel/job-experience";

const mapStateToProps = state => {
  return {
    i18n: state.currentI18n,
    jobExperience: state.currentData.jobExperience,
  };
};

const JobExperienceContainer = connect(mapStateToProps)(JobExperience);

export default JobExperienceContainer;
