import BioRepository from "repository/bio-repository";

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

const appData = {};

appData["bio"] = new BioRepository(dataBasePath).getBio(lang);

console.log(JSON.stringify(appData));
