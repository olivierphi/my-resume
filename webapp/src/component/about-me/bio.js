import React from "react";
import PropTypes from "prop-types";
import HeaderIcon from "component/misc/header-icon";
import UserIcon from "../../../assets/img/icons/header-icons/user.svg";
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
        <span itemProp="address">
          {this.props.bio.address.split("\n").map((addressLine, key) => {
            return (
              <span key={key}>
                {addressLine}
                <br />
              </span>
            );
          })}
        </span>
        <p>
          <a itemProp="email" href={`mailto:${this.props.bio.email}`}>
            {this.props.bio.email}
          </a>
        </p>
        <p>
          {this.props.i18n.me.phone}
          <span itemProp="telephone">{this.props.bio.phoneNumber}</span>
        </p>
        <p className="rich-snippet-only">
          <span itemProp="url">{this.props.bio.url}</span>
        </p>
        <p>
          <a
            itemProp="sameAs"
            href={`https://twitter.com/${this.props.bio.twitterId}`}
            target="_blank"
            className="twitter-link"
          >
            twitter.com/RougeMine
          </a>
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
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    twitterId: PropTypes.string.isRequired,
  }).isRequired,
  i18n: PropTypes.shape({
    me: PropTypes.shape({
      birthDate: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
