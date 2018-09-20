import { promisify } from "util";
import * as fs from "fs";
import { join as pathJoin } from "path";
import { createBundleRenderer } from "vue-server-renderer";

const fsAsync = {
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  stat: promisify(fs.stat),
};

try {
  run();
} catch (err) {
  console.log("Ouch! An error has occured.");
  console.log(err);
  process.exit(1);
}

async function run() {
  const { htmlTemplatesFolderPath, lang } = await parseAndCheckArgs();
  const baseHtml = await getBaseHtml(htmlTemplatesFolderPath);
  const renderedApp = await getRenderedAppHtml({ lang });
  const htmlForThisLang = baseHtml
    .replace("$html-attributes", `lang="${lang}"`)
    .replace(`<div id=app></div>`, `<div id=app>${renderedApp}</div>`);
  await writeHtml(htmlTemplatesFolderPath, lang, htmlForThisLang);

  console.log(`Generated "dist/index.${lang}.html".`);
}

async function parseAndCheckArgs() {
  const USAGE_STR =
    "Usage: node bin/generate-static-html.js [htmlTemplatesFolderPath] [lang]";

  if (process.argv.length < 4) {
    console.log(USAGE_STR);
  }

  const htmlTemplatesFolderPath = process.argv[2];

  try {
    const htmlTemplatesFolderPathStats = await fsAsync.stat(
      htmlTemplatesFolderPath,
    );
    if (!htmlTemplatesFolderPathStats.isDirectory()) {
      throw '"htmlTemplatesFolderPath" exists but is not a folder';
    }
  } catch (err) {
    console.log(
      `${USAGE_STR} - "htmlTemplatesFolderPath" must be a valid folder`,
    );
    console.log(err);
    process.exit(1);
  }

  const lang = process.argv[3];

  const validLangs = ["en", "fr"];
  if (!validLangs.includes(lang)) {
    console.log(
      `${USAGE_STR} -  "lang" must be ${validLangs.join("|")}, got ${lang}`,
    );
    process.exit(1);
  }

  return { htmlTemplatesFolderPath, lang };
}

async function getBaseHtml(htmlTemplatesFolderPath) {
  const baseHtml = await fsAsync.readFile(
    pathJoin(htmlTemplatesFolderPath, "index.html"),
    { encoding: "utf-8" },
  );
  return baseHtml;
}

async function writeHtml(htmlTemplatesFolderPath, lang, content) {
  await fsAsync.writeFile(
    pathJoin(htmlTemplatesFolderPath, `index.${lang}.html`),
    content,
  );
}

async function getRenderedAppHtml(appContext) {
  const serverBundle = require("../dist/vue-ssr-server-bundle.json");

  const renderer = createBundleRenderer(serverBundle, {});

  const renderToString = promisify(renderer.renderToString);
  try {
    const html = await renderToString(appContext);
    return html;
  } catch (err) {
    console.log("An error has occured while rendering the app to a string");
    throw err;
  }
}
