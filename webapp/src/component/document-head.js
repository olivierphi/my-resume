import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

export default class DocumentHead extends React.PureComponent {
  render() {
    return (
      <Helmet>
        <html lang={this.props.currentLang} />
        <title>{this.props.document.meta.title}</title>
        <meta
          name="description"
          content={this.props.document.meta.description}
        />
        <meta name="language" content={this.props.currentLang} />
        <link rel="canonical" href={this.props.currentLang} />
        <meta name="viewport" content="initial-scale=1" />
      </Helmet>
    );
  }
}

DocumentHead.propTypes = {
  currentLang: PropTypes.string.isRequired,
  document: PropTypes.shape({
    meta: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  }),
};
