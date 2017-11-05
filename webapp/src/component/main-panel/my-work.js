import React from "react";
import { PropTypes } from "prop-types";
import MyWorkIcon from "../../../assets/img/icons/header-icons/lab-red.svg";

export default class MyWork extends React.PureComponent {
  render() {
    return (
      <section className="work-container">
        <h3>
          <img src={MyWorkIcon} alt="" />
          {this.props.i18n.my_work}
        </h3>

        <ul>
          {this.props.myWork.map(({ title, content }) => {
            return (
              <li key={title}>
                <span className="heading">{title} :</span>
                <span dangerouslySetInnerHTML={{ __html: ` ${content}` }} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

MyWork.propTypes = {
  i18n: PropTypes.shape({
    my_work: PropTypes.string.isRequired,
  }),
  myWork: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
