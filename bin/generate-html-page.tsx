import * as path from "path";
import { writeFile } from "fs/promises";

import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Resume } from "../src/components/hi";
import { LANG } from "../src/domain";

const VALID_LANGUAGES = ["en", "fr"];

const langCode: string = process.env["LANG_CODE"] ?? "en"; // we'd better not use "LANG", as the OS already sets it

if (!VALID_LANGUAGES.includes(langCode)) {
  console.error(`"${langCode}" is not a valid language code (should be ${VALID_LANGUAGES.join("|")})`);
  process.exit(1);
}

const htmlCode = renderToStaticMarkup(<Resume lang={langCode as LANG} />);
const targetFilePath = path.join(__dirname, "../", "dist", `${langCode}.html`);
writeFile(targetFilePath, htmlCode, { encoding: "utf-8" });

console.log(`HTML page generated in "${path.resolve(targetFilePath)}".`);
