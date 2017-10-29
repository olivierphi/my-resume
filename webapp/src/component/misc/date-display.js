import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default class DateDisplay extends React.PureComponent {
  render() {
    const inputDate =
      this.props.inputDate instanceof Date
        ? this.props.inputDate
        : moment(this.props.inputDate, this.props.inputDateFormat);

    return inputDate.format(this.props.outputDateFormat);
  }
}

DateDisplay.propTypes = {
  inputDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  inputDateFormat: PropTypes.string, //required only when the inputDate is a String
  outputDateFormat: PropTypes.string.isRequired,
};
