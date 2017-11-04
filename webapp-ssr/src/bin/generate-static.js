import fs from "fs";
import { getRenderedApp } from "entrypoint.ssr";
import ApiUtils from "../../../api/utils";

const USAGE_STR =
  "Usage: node bin/generate-static.js [jsonFilesPath] [htmlTemplatePath] [lang]";

if (process.argv.length < 5) {
  console.log(USAGE_STR);
}

const jsonFilesPath = process.argv[2];

try {
  const jsonFilesPathStats = fs.statSync(jsonFilesPath);
  if (!jsonFilesPathStats.isDirectory()) {
    throw '"jsonFilesPath" exists but is not a folder';
  }
} catch (err) {
  console.log(`${USAGE_STR} - "jsonFilesPath" must be a valid folder`);
  console.log(err);
  process.exit(1);
}

const htmlTemplatePath = process.argv[3];

let htmlTemplate;
try {
  htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");
} catch (err) {
  console.log(
    `${USAGE_STR} - "htmlTemplatePath" must be a valid readbable file path`
  );
  console.log(err);
  process.exit(1);
}

const lang = process.argv[4];

const validLangs = ["en", "fr"];
if (!validLangs.includes(lang)) {
  console.log(
    `${USAGE_STR} -  "lang" must be ${validLangs.join("|")}, got ${lang}`
  );
  process.exit(1);
}

const appInitialState = ApiUtils.getAppInitialState(jsonFilesPath, lang);

const { appContent, documentHeadContent, initialState } = getRenderedApp(
  appInitialState
);

const renderedHtmlPage = htmlTemplate
  .replace('<div id="root"></div>', `<div id="root">${appContent}</div>`)
  .replace("$htmlAttributes", documentHeadContent.htmlAttributes)
  .replace(/<title>.+<\/title>/, documentHeadContent.title)
  .replace(
    "<!-- $metadata -->",
    documentHeadContent.meta + documentHeadContent.link
  )
  .replace(
    /window.__INITIAL__STATE__\s*=\s*\{.+\};\s*$/m,
    `window.__INITIAL__STATE__ = ${JSON.stringify(initialState)};`
  );

console.log(renderedHtmlPage);
