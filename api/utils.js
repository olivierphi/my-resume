const fs = require("fs");

function getAppInitialState(dataJsonFilesPath, currentLang) {
  const AppDataEn = JSON.parse(
    fs.readFileSync(`${dataJsonFilesPath}/app-data.en.json`, "utf-8")
  );
  const AppDataFr = JSON.parse(
    fs.readFileSync(`${dataJsonFilesPath}/app-data.fr.json`, "utf-8")
  );

  return {
    currentLang: currentLang,
    dataByLang: {
      en: AppDataEn.cvData,
      fr: AppDataFr.cvData,
    },
    i18nByLang: {
      en: AppDataEn.i18nData,
      fr: AppDataFr.i18nData,
    },
    buildTime: AppDataEn.buildTime,
    currentData: {},
    currentI18n: {},
  };
}

module.exports.getAppInitialState = getAppInitialState;
