MAKE_NO_PRINT = ${MAKE} --no-print-directory

.PHONY: install
install:
	yarn install
	${MAKE_NO_PRINT} src/data/resume-data.ts

.PHONY: install-vercel
install-vercel: install
# @link https://github.com/alixaxel/chrome-aws-lambda/issues/154
	yarn add chrome-aws-lambda@3.0.4 puppeteer-core@3.0.4 

.PHONY: clean
clean:
	rm -rf dist/* || true
	${MAKE_NO_PRINT} dist/.gitkeep

.PHONY: generate-server-bundle-json
generate-server-bundle-json:
	./node_modules/.bin/webpack-cli --config bin/_generate-static.webpack-config.js --mode production

.PHONY: generate-server-html
generate-server-html: GA_TRACKING_ID ?=
generate-server-html:
	NO_SERVICE_WORKER=1 GA_TRACKING_ID=${GA_TRACKING_ID} node -r esm bin/generate-static-html.js "$$(pwd)/dist/" ${APP_LANG}

.PHONY: dump-data-to-typescript
dump-data-to-typescript:
	node -r esm bin/dump-data.js

.PHONY: serve
serve:
	./node_modules/.bin/vue-cli-service serve

.PHONY: build
build: dump-data-to-typescript
# 1. Build the "dist/" folder
	${MAKE_NO_PRINT} vue-build
# 2. Generate a JSON file ("dist/vue-ssr-server-bundle.json") that contains our app content, to be used by the Webpack VueSSRServerPlugin
	${MAKE_NO_PRINT} generate-server-bundle-json
# 3. Generate a "dist/index.[lang].html" file for each lang, based on the JSON generated during the previous step
	${MAKE_NO_PRINT} generate-server-html APP_LANG=en
	${MAKE_NO_PRINT} generate-server-html APP_LANG=fr

.PHONY: generate-pdfs
generate-pdfs: pdf_generation_server_port ?= 8000
generate-pdfs:
# Launch the HTTP server, in order to generate the PDF files from the HTML pages. Saves its PID.
	node_modules/.bin/http-server dist/ -p ${pdf_generation_server_port} & echo $$! > dist/http-server.pid
# Generates the PDF files
	sleep 1
	node bin/create-pdf.js 'http://127.0.0.1:${pdf_generation_server_port}' en
	node bin/create-pdf.js 'http://127.0.0.1:${pdf_generation_server_port}' fr
# Kills the HTTP server
	kill `cat dist/http-server.pid`
	rm dist/http-server.pid

.PHONY: generate-light-pdfs
generate-light-pdfs:
# N.B. Requires GhostScript. Tends to generate errors related to "embedded font streams", but it seems that the
# generated PDFs work ok?
	@echo "Generating a lighter version of the English PDF..."
	@gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -sOutputFile=dist/cv-olivier-philippon.en.light.pdf dist/cv-olivier-philippon.en.pdf	
	@echo "Generating a lighter version of the French PDF..."
	@gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -sOutputFile=dist/cv-olivier-philippon.fr.light.pdf dist/cv-olivier-philippon.fr.pdf
	
.PHONY: vue-build
vue-build:
	./node_modules/.bin/vue-cli-service build
	${MAKE_NO_PRINT} dist/.gitkeep

.PHONY: lint
lint:
	./node_modules/.bin/vue-cli-service lint

src/data/resume-data.ts: data/*.toml bin/dump-data.js
	${MAKE_NO_PRINT} dump-data-to-typescript

src/data/i18n-data.ts: data/*.toml bin/dump-data.js
	${MAKE_NO_PRINT} dump-data-to-typescript

dist/.gitkeep:
	mkdir dist || true
	touch dist/.gitkeep

dist/index.fr.html: dist/vue-ssr-server-bundle.json dist/index.html
	${MAKE_NO_PRINT} generate-server-html APP_LANG=fr

dist/index.en.html: dist/vue-ssr-server-bundle.json dist/index.html
	${MAKE_NO_PRINT} generate-server-html APP_LANG=en

dist/index.html: public/index.html
	${MAKE_NO_PRINT} build

dist/vue-ssr-server-bundle.json:
	${MAKE_NO_PRINT} generate-server-bundle
