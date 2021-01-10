import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Resume } from "./components/hi";

console.log(renderToStaticMarkup(<Resume lang="en" />));
