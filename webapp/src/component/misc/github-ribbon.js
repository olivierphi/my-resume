import React from "react";
import "./github-ribbon.scss";

export default function GitHubRibbon(props) {
  // @link https://codepo8.github.io/css-fork-on-github-ribbon/
  return (
    <div className="github-ribbon">
      <a
        href="https://github.com/DrBenton/rougemine.com-online-resume"
        target="_blank"
      >
        Fork me on GitHub
      </a>
    </div>
  );
}
