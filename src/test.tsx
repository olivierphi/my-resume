import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Hi } from "./components/hi";

console.log(renderToStaticMarkup(<Hi lang="en" />));
