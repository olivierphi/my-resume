import React from "react";
import { PropTypes } from "prop-types";
import MainSkillsIcon from "../../../assets/img/icons/header-icons/tool-red.png";
import "./skills.scss";

export default class Skills extends React.PureComponent {
  render() {
    const nbOtherTechnologies = this.props.technologies.otherTechnologies
      .length;
    const nbToolss = this.props.technologies.tools.length;

    return (
      <section className="skills-container">
        <h3>
          <img src={MainSkillsIcon} alt="" />
          {this.props.i18n.main_skills}
        </h3>

        <div className="main-technologies-container">
          {this.props.technologies.mainTechnologies.map(technology => {
            return (
              <div className="tech clearfix" key={technology.title}>
                <span className={`tech-with-icon ${technology.icon}`} />
                <span className="title">
                  <TechDisplay tech={technology} />
                </span>
              </div>
            );
          })}
        </div>
        {/* end .main-technologies-container */}

        <div className="other-technologies-container">
          <h4>{this.props.i18n.other_skills}</h4>
          {this.props.technologies.otherTechnologies.map((technology, i) => {
            const separator =
              i < nbOtherTechnologies - 1 ? (
                <span dangerouslySetInnerHTML={{ __html: ",&nbsp;" }} />
              ) : null;

            return (
              <span
                className={`tech-with-icon ${technology.icon}`}
                key={technology.title}
              >
                <TechDisplay tech={technology} />
                {technology["contributor-url"] ? (
                  <div className="contributor">
                    <a href={technology["contributor-url"]} target="_blank">
                      {this.props.i18n.contributor}
                    </a>
                  </div>
                ) : null}
                {separator}
              </span>
            );
          })}
          ...
        </div>
        {/* end .other-technologies-container */}

        <div className="tools-container">
          <h4>{this.props.i18n.tools}</h4>
          {this.props.technologies.tools.map((tool, i) => {
            const separator = i < nbToolss - 1 ? ", " : null;

            if (tool.url) {
              return (
                <span key={tool.title}>
                  <a href={tool.url} target="_blank">
                    {tool.title}
                  </a>
                  {separator}
                </span>
              );
            }

            return (
              <span key={tool.title}>
                {tool.title}
                {separator}
              </span>
            );
          })}
          ...
        </div>
        {/* end .tools-container */}
      </section>
    );
  }
}

Skills.propTypes = {
  i18n: PropTypes.shape({
    main_skills: PropTypes.string.isRequired,
    other_skills: PropTypes.string.isRequired,
    contributor: PropTypes.string.isRequired,
    tools: PropTypes.string.isRequired,
  }),
  technologies: PropTypes.shape({
    mainTechnologies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        url: PropTypes.string,
      })
    ),
    otherTechnologies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
          .isRequired,
        icon: PropTypes.string.isRequired,
        url: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        "contributor-url": PropTypes.string,
      })
    ),
    tools: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
      })
    ),
  }),
};

class TechDisplay extends React.PureComponent {
  render() {
    const tech = this.props.tech;
    if (tech.url) {
      if (Array.isArray(tech.title)) {
        const nbTitles = tech.title.length;
        return tech.title.map((title, i) => {
          return (
            <span key={title}>
              <a href={tech.url[i]} target="_blank">
                {tech.title}
              </a>
              {i < nbTitles - 1 ? " / " : ""}
            </span>
          );
        });
      }

      return (
        <a href={tech.url} target="_blank">
          {tech.title}
        </a>
      );
    }

    return <span>{tech.title}</span>;
  }
}

TechDisplay.propTypes = {
  tech: PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  }),
};
