import React from "react";
import PropTypes from "prop-types";
import HeaderIcon from "component/misc/header-icon";
import HeartIcon from "../../../assets/img/icons/header-icons/fave.svg";

const Hobbies = props => {
  return (
    <section className="hobbies-container">
      <HeaderIcon icon={HeartIcon} alt="hobbies" />

      <h3>{props.i18n.hobbies.title}</h3>

      <p>{props.i18n.hobbies.content}</p>
    </section>
  );
};

Hobbies.propTypes = {
  i18n: PropTypes.shape({
    hobbies: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Hobbies;
