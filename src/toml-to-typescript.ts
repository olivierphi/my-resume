import { readFile, writeFile } from "fs/promises";
import * as path from "path";

import * as toml from "toml";

const TOML_SOURCE_FILES_DIR = path.join(__dirname, "..", "data/");
const TS_TARGET_FILES_DIR = path.join(__dirname, "data/");
const I18N_TARGET_FILE_PATH = path.join(TS_TARGET_FILES_DIR, "i18n-data.ts");
const RESUME_TARGET_FILE_PATH = path.join(TS_TARGET_FILES_DIR, "resume-data.ts");

export async function dumpI18nData(): Promise<void> {
  const rawI18nData = await Promise.all([getDataFromFile("i18n.en.toml"), getDataFromFile("i18n.fr.toml")]);

  const structuredI18nData = {
    en: rawI18nData[0],
    fr: rawI18nData[1],
  };

  const typeScriptI18nData = `export const I18N_DATA = ${JSON.stringify(structuredI18nData, null, 2)};`;
  await writeFile(I18N_TARGET_FILE_PATH, typeScriptI18nData);
}

export async function dumpResumeData(): Promise<void> {
  const rawResumeData = await Promise.all([
    getDataFromFile("technologies.toml"),
    getDataFromFile("document.en.toml"),
    getDataFromFile("document.fr.toml"),
    getDataFromFile("bio.en.toml"),
    getDataFromFile("bio.fr.toml"),
    getDataFromFile("job-experience.en.toml"),
    getDataFromFile("job-experience.fr.toml"),
    getDataFromFile("projects.en.toml"),
    getDataFromFile("projects.fr.toml"),
  ]);

  const structuredResumeData = {
    technologies: rawResumeData[0],
    en: {
      document: rawResumeData[1],
      bio: rawResumeData[3],
      jobExperience: rawResumeData[5].experiences,
      projects: rawResumeData[7].projects,
    },
    fr: {
      document: rawResumeData[2],
      bio: rawResumeData[4],
      jobExperience: rawResumeData[6].experiences,
      projects: rawResumeData[8].projects,
    },
  };

  const typeScriptResumeData = `export const RESUME_DATA = ${JSON.stringify(structuredResumeData, null, 2)};`;
  await writeFile(RESUME_TARGET_FILE_PATH, typeScriptResumeData);
}

type RawData = { [key: string]: any };

async function getDataFromFile(dataFileName: string): Promise<RawData> {
  const dataFileContent = await readDataFile(dataFileName);
  const data = toml.parse(dataFileContent);
  return data;
}

async function readDataFile(dataFileName: string): Promise<string> {
  return await readFile(path.join(TOML_SOURCE_FILES_DIR, dataFileName), { encoding: "utf8" });
}
