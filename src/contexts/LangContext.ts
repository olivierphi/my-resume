import * as React from "react";
import { LANG } from "../domain";

export const LangContext: React.Context<LANG> = React.createContext<LANG>("en");
