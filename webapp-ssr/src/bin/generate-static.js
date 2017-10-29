import { getRenderedApp } from "entrypoint.ssr";
import HtmlTemplate from "../../../webapp/assets/index.tpl.html";
import AppDataEn from "../../../var/app-data.en.json";
import AppDataFr from "../../../var/app-data.fr.json";

if (process.argv.length < 3) {
  console.log("Usage: node bin/generate-static.js [lang]");
}

const lang = process.argv[2];

const validLangs = ["en", "fr"];
if (!validLangs.includes(lang)) {
  console.log(
    `Usage: node bin/generate-static.js [lang] - "lang" must be ${validLangs.join(
      "|"
    )}, got ${lang}`
  );
  process.exit(1);
}

const appData = {
  en: JSON.parse(AppDataEn),
  fr: JSON.parse(AppDataFr),
};

const { appContent, documentHeadContent, initialState } = getRenderedApp(
  appData.en,
  appData.fr,
  lang
);

const renderedHtmlPage = HtmlTemplate.replace("%RENDERED_APP%", appContent)
  .replace("%RENDERED_APP_HTML_ATTRIBUTES%", documentHeadContent.htmlAttributes)
  .replace("%RENDERED_APP_TITLE%", documentHeadContent.title)
  .replace(
    "%RENDERED_APP_META%",
    documentHeadContent.meta + documentHeadContent.link
  )
  .replace("%INITIAL_STATE%", JSON.stringify(initialState));

console.log(renderedHtmlPage);
