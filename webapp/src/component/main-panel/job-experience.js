import React from "react";
import { PropTypes } from "prop-types";
import JobExperienceIcon from "../../../assets/img/icons/header-icons/video-red.svg";

export default class JobExperience extends React.PureComponent {
  render() {
    return (
      <section className="job-experience-container">
        <h3>
          <img src={JobExperienceIcon} alt="" />
          {this.props.i18n.job_experience}
        </h3>

        <ul>
          {this.props.jobExperience.map(experience => {
            return (
              <li key={experience.period}>
                <span className="heading">{experience.period} :</span>
                <span
                  dangerouslySetInnerHTML={{ __html: ` ${experience.content}` }}
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

JobExperience.propTypes = {
  i18n: PropTypes.shape({
    job_experience: PropTypes.string.isRequired,
  }),
  jobExperience: PropTypes.arrayOf(
    PropTypes.shape({
      period: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
