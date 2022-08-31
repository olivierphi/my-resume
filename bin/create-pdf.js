const IS_VERCEL = !!process.env["VERCEL"];
const puppeteer = IS_VERCEL
  ? require("chrome-aws-lambda").puppeteer
  : require("puppeteer");

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
    `${USAGE_STR} - "lang" must be ${validLangs.join("|")}, got ${lang}`,
  );
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch(
    IS_VERCEL
      ? {
          // @link https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        }
      : {},
  );
  const page = await browser.newPage();

  const cvFullUrl = `${cvUrl}?lang=${lang}`;
  console.log(
    `Generating PDF for language "${lang}" (from URL ${cvFullUrl})...`,
  );

  await page.goto(cvFullUrl);
  await waitFor(2000); //we have to give some time to the browser for loading the WebFont
  await page.pdf({
    path: `dist/cv-olivier-philippon.${lang}.pdf`,
    format: "A4",
    printBackground: true,
    pageRanges: "1-1",
  });

  console.log("PDF generated, closing browser.");

  await browser.close();
})();

function waitFor(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}
