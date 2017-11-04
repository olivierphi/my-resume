import React from "react";
import ReactDOMServer from "react-dom/server";
import AppReducer from "reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Helmet } from "react-helmet";
import App from "component/app";

export function getRenderedApp(/** Object */ appInitialState) {
  const store = createStore(AppReducer, appInitialState);

  const reactAppContent = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const reactAppDocumentHeadContent = Helmet.renderStatic();

  return {
    appContent: reactAppContent,
    documentHeadContent: reactAppDocumentHeadContent,
    initialState: appInitialState,
  };
}
