import { connect } from "react-redux";
import DateDisplay from "component/misc/date-display";

const mapStateToProps = state => {
  return {
    outputDateFormat: state.currentI18n.date_format,
  };
};

const DateDisplayContainer = connect(mapStateToProps)(DateDisplay);

export default DateDisplayContainer;
