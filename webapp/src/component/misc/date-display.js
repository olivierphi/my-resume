import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default class DateDisplay extends React.PureComponent {
  render() {
    return moment(this.props.inputDate, this.props.inputDateFormat).format(
      this.props.outputDateFormat
    );
  }
}

DateDisplay.propTypes = {
  inputDate: PropTypes.string.isRequired,
  inputDateFormat: PropTypes.string.isRequired,
  outputDateFormat: PropTypes.string.isRequired,
};
