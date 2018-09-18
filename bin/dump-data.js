import { promisify } from "util";
import { readFile, writeFile } from "fs";
import { join as pathJoin } from "path";

import * as toml from "toml";

const fsAsync = {
  readFile: promisify(readFile),
  writeFile: promisify(writeFile),
};

const TARGET_FILES_FOLDER_PATH = pathJoin(__dirname, "..", "src", "data");
const I18N_TARGET_FILE_PATH = pathJoin(
  TARGET_FILES_FOLDER_PATH,
  "i18n-data.ts",
);
const RESUME_TARGET_FILE_PATH = pathJoin(
  TARGET_FILES_FOLDER_PATH,
  "resume-data.ts",
);

async function dumpData() {
  await Promise.all([dumpI18nData(), dumpResumeData()]);
}

async function dumpI18nData() {
  const rawI18nData = await Promise.all([
    dumpDataFromFile("i18n.en.toml"),
    dumpDataFromFile("i18n.fr.toml"),
  ]);

  const structuredI18nData = {
    en: rawI18nData[0],
    fr: rawI18nData[1],
  };

  const typeScriptI18nData = `export const I18N_DATA = ${JSON.stringify(
    structuredI18nData,
    null,
    2,
  )};`;
  await fsAsync.writeFile(I18N_TARGET_FILE_PATH, typeScriptI18nData);
}

async function dumpResumeData() {
  const rawResumeData = await Promise.all([
    dumpDataFromFile("bio.en.toml"),
    dumpDataFromFile("bio.fr.toml"),
  ]);

  const structuredResumeData = {
    en: {
      bio: rawResumeData[0],
    },
    fr: {
      bio: rawResumeData[1],
    },
  };

  const typeScriptResumeData = `export const RESUME_DATA = ${JSON.stringify(
    structuredResumeData,
    null,
    2,
  )};`;
  await fsAsync.writeFile(RESUME_TARGET_FILE_PATH, typeScriptResumeData);
}

async function dumpDataFromFile(dataFileName) {
  const dataFileContent = await readDataFile(dataFileName);
  const data = toml.parse(dataFileContent);
  return data;
}

function readDataFile(dataFileName) {
  return fsAsync.readFile(pathJoin(__dirname, "..", "data", dataFileName));
}

(async () => {
  console.log(`Reading data from "data/*toml" files...`);
  try {
    await dumpData();
  } catch (err) {
    console.log("Ouch! An error has occured.");
    console.log(err);
    process.exit(1);
  }
  console.log(`Data dumped to TypeScript file ${RESUME_TARGET_FILE_PATH}.`);
})();
