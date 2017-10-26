import React from "react";
import ReactDOMServer from "react-dom/server";
import AppReducer from "reducers";
import { Provider } from "react-redux";
import BioContainer from "container/bio";
import { createStore } from "redux";

const store = createStore(AppReducer);

const app = ReactDOMServer.renderToStaticMarkup(
  <Provider store={store}>
    <BioContainer />
  </Provider>
);

console.log(app);
