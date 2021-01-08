import { dumpI18nData, dumpResumeData } from "../src/toml-to-typescript";

Promise.all([dumpResumeData(), dumpI18nData()])
  .then(() => {
    console.log("TypeScript files created from TOML data source.");
  })
  .catch((err) => {
    console.error(err);
  });
