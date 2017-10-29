import React from "react";
import PropTypes from "prop-types";
import HeaderIcon from "component/misc/header-icon";
import GitHubIcon from "../../../assets/img/icons/header-icons/github.svg";

const OpenSource = props => {
  return (
    <section className="open-source-projects-container">
      <HeaderIcon icon={GitHubIcon} alt="GitHub" />

      <h3>{props.i18n.open_source_projects.title}</h3>
      <a
        itemProp="sameAs"
        href={`https://github.com/${props.openSource.githubId}`}
        target="_blank"
        className="github-link"
      >
        github.com/{props.openSource.githubId}
      </a>
    </section>
  );
};

OpenSource.propTypes = {
  openSource: PropTypes.shape({
    githubId: PropTypes.string.isRequired,
  }).isRequired,
  i18n: PropTypes.shape({
    open_source_projects: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OpenSource;
