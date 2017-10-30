import React from "react";
import PropTypes from "prop-types";
import HeaderIcon from "component/misc/header-icon";
import GraduateIcon from "../../../assets/img/icons/header-icons/teaching.png";

const Teaching = props => {
  return (
    <section className="teaching-container">
      <HeaderIcon icon={GraduateIcon} alt="teaching" />

      <h3>{props.i18n.teaching.title}</h3>

      <p dangerouslySetInnerHTML={{ __html: props.i18n.teaching.content }} />
    </section>
  );
};

Teaching.propTypes = {
  i18n: PropTypes.shape({
    teaching: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Teaching;
