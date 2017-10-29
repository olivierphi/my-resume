import React from "react";
import ReactDOMServer from "react-dom/server";
import AppReducer from "reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Helmet } from "react-helmet";
import App from "component/app";

export function getRenderedApp(appDataEn, appDataFr, currentLang) {
  const initialState = getAppInitialState(appDataEn, appDataFr, currentLang);
  return renderApp(initialState);
}

function getAppInitialState(appDataEn, appDataFr, currentLang) {
  return {
    currentLang: currentLang,
    dataByLang: {
      en: appDataEn.cvData,
      fr: appDataFr.cvData,
    },
    i18nByLang: {
      en: appDataEn.i18nData,
      fr: appDataFr.i18nData,
    },
    currentData: {},
    currentI18n: {},
  };
}

function renderApp(/** Object */ appState) {
  const store = createStore(AppReducer, appState);

  const reactAppContent = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const reactAppDocumentHeadContent = Helmet.renderStatic();

  return {
    appContent: reactAppContent,
    documentHeadContent: reactAppDocumentHeadContent,
    initialState: appState,
  };
}
