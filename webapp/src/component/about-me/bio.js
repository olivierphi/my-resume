import React from "react";
import PropTypes from "prop-types";
import HeaderIcon from "component/misc/header-icon";
import UserIcon from "component/header-icons/user.svg";
import DateDisplayContainer from "container/misc/date-display";

export default class Bio extends React.Component {
  render() {
    return (
      <section className="me-container">
        <HeaderIcon icon={UserIcon} alt="me" />
        <p>
          <span itemProp="name">{this.props.bio.name}</span>
        </p>
        <p className="rich-snippet-only">
          <span itemProp="jobTitle">{this.props.bio.jobTitle}</span>
        </p>
        <p>
          {this.props.i18n.me.birthDate}
          <DateDisplayContainer
            inputDate={this.props.bio.birth}
            inputDateFormat="YYYY-MM-DD"
          />
        </p>
      </section>
    );
  }
}

Bio.propTypes = {
  bio: PropTypes.shape({
    name: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
  }).isRequired,
  i18n: PropTypes.shape({
    me: PropTypes.shape({
      birthDate: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
