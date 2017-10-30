import React from "react";
import PropTypes from "prop-types";
import dateFormat from "date-fns/format";
import dateParse from "date-fns/parse";

export default class DateDisplay extends React.PureComponent {
  render() {
    const inputDate =
      this.props.inputDate instanceof Date
        ? this.props.inputDate
        : dateParse(this.props.inputDate, this.props.inputDateFormat);

    return dateFormat(inputDate, this.props.outputDateFormat);
  }
}

DateDisplay.propTypes = {
  inputDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  inputDateFormat: PropTypes.string, //required only when the inputDate is a String
  outputDateFormat: PropTypes.string.isRequired,
};
