import React from "react";
import PropTypes from "prop-types";

export default class HeaderIcon extends React.PureComponent {
  render() {
    return (
      <span className="header-icon">
        <img src={this.props.icon} alt={this.props.alt || null} />
      </span>
    );
  }
}

HeaderIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
