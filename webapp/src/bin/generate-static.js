import HtmlTemplate from "../../assets/index.tpl.html";
import AppDataEn from "../../../var/app-data.en.json";
import AppDataFr from "../../../var/app-data.fr.json";
import React from "react";
import ReactDOMServer from "react-dom/server";
import AppReducer from "reducers";
import { Provider } from "react-redux";
import App from "container/app";
import { createStore } from "redux";

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

const initialState = getAppInitialState();
const renderedApp = renderApp(initialState);

const renderedHtmlPage = HtmlTemplate.replace(
  "%RENDERED_APP%",
  renderedApp
).replace("%INITIAL_STATE%", JSON.stringify(initialState));

console.log(renderedHtmlPage);

function getAppInitialState() {
  const appData = {
    en: JSON.parse(AppDataEn),
    fr: JSON.parse(AppDataFr),
  };

  return {
    currentLang: lang,
    dataByLang: {
      en: appData.en.cvData,
      fr: appData.fr.cvData,
    },
    i18nByLang: {
      en: appData.en.i18nData,
      fr: appData.fr.i18nData,
    },
    currentData: {},
    currentI18n: {},
  };
}

function renderApp(/** Object */ appState) {
  const store = createStore(AppReducer, appState);

  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
