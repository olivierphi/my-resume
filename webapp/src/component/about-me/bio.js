import React from "react";
import PropTypes from "prop-types";
import HeaderIcon from "component/misc/header-icon";
import UserIcon from "../../../assets/img/icons/header-icons/user.svg";
import DateDisplayContainer from "container/misc/date-display";

const Bio = props => {
  return (
    <section className="me-container">
      <HeaderIcon icon={UserIcon} alt="me" />
      <p>
        <span itemProp="name">{props.bio.name}</span>
      </p>
      <p className="rich-snippet-only">
        <span itemProp="jobTitle">{props.bio.jobTitle}</span>
      </p>
      <p>
        {props.i18n.me.birthDate}
        <DateDisplayContainer
          inputDate={props.bio.birth}
          inputDateFormat="YYYY-MM-DD"
        />
      </p>
      <span itemProp="address">
        {props.bio.address.split("\n").map((addressLine, key) => {
          return (
            <span key={key}>
              {addressLine}
              <br />
            </span>
          );
        })}
      </span>
      <p>
        <a itemProp="email" href={`mailto:${props.bio.email}`}>
          {props.bio.email}
        </a>
      </p>
      <p>
        {props.i18n.me.phone}
        <span itemProp="telephone">{props.bio.phoneNumber}</span>
      </p>
      <p className="rich-snippet-only">
        <span itemProp="url">{props.bio.url}</span>
      </p>
      <p>
        <a
          itemProp="sameAs"
          href={`https://twitter.com/${props.bio.twitterId}`}
          target="_blank"
          className="twitter-link"
        >
          twitter.com/RougeMine
        </a>
      </p>
    </section>
  );
};

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

export default Bio;
