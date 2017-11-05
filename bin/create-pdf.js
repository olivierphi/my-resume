const puppeteer = require("puppeteer");

const USAGE_STR = "Usage: node bin/create-pdf.js [cv URL] [lang]";

if (process.argv.length < 4) {
  console.log(USAGE_STR);
  process.exit(1);
}

const cvUrl = process.argv[2];
const lang = process.argv[3];

const validLangs = ["en", "fr"];
if (!validLangs.includes(lang)) {
  console.log(
    `${USAGE_STR} - "lang" must be ${validLangs.join("|")}, got ${lang}`
  );
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${cvUrl}lang=${lang}`, { waitUntil: ["networkidle2"] });
  await waitFor(2000); //we have to give some time to the browser for loading the WebFont
  await page.pdf({
    path: `dist/cv-olivier-philippon.${lang}.pdf`,
    format: "A4",
    printBackground: true,
    pageRanges: "1-1",
  });

  await browser.close();
})();

function waitFor(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}
