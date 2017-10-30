import React from "react";
import PropTypes from "prop-types";
import HeaderIcon from "component/misc/header-icon";
import EducationIcon from "../../../assets/img/icons/header-icons/ruler.svg";

const Education = props => {
  return (
    <section className="education-container">
      <HeaderIcon icon={EducationIcon} alt="GitHub" />

      <h3>{props.i18n.education.title}</h3>

      <p>
        {props.i18n.education.src}
        <br />
        <i>{props.i18n.education["src.details"]}</i>
      </p>
      <p>{props.i18n.education.baccalaureate}</p>
    </section>
  );
};

Education.propTypes = {
  i18n: PropTypes.shape({
    education: PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      "src.details": PropTypes.string.isRequired,
      baccalaureate: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Education;
