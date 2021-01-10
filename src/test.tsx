import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Resume } from "./components/Resume";

console.log(renderToStaticMarkup(<Resume lang="en" />));
