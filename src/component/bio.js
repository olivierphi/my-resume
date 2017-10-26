import React from "react";

export default class Bio extends React.Component {
  render() {
    return (
      <section className="me-container">
        <p>
          <span itemProp="name">
            {this.props.firstName} {this.props.surname}
          </span>
        </p>
        <p className="rich-snippet-only">
          <span itemProp="jobTitle">{this.props.jobTitle}</span>
        </p>
      </section>
    );
  }
}
