import moment from "moment";
import BioRepository from "repository/bio-repository";
import I18nRepository from "repository/i18n-repository";
import DocumentRepository from "repository/document-repository";

if (process.argv.length < 4) {
  console.log("Usage: node bin/generate-app-data.js [data path] [lang]");
}

const dataBasePath = process.argv[2];
const lang = process.argv[3];

const validLangs = ["en", "fr"];
if (!validLangs.includes(lang)) {
  console.log(
    `Usage: node bin/generate-app-data.js [data path] [lang] - "lang" must be ${validLangs.join(
      "|"
    )}, got ${lang}`
  );
  process.exit(1);
}

const W3C_DATE_FORMAT = "YYYY-MM-DD\\THH:mm:ssZZ";

const appData = {
  cvData: {
    bio: new BioRepository(dataBasePath).getBio(lang),
    document: new DocumentRepository(dataBasePath).getDocument(lang),
  },
  i18nData: new I18nRepository(dataBasePath).getInternationalisationData(lang),
  buildTime: moment().format(W3C_DATE_FORMAT),
};

console.log(JSON.stringify(appData));
