PDF_GENERATION_SERVER_PORT ?= 8000

.PHONY: install
install:
	yarn install
	${MAKE} src/data/resume-data.ts

.PHONY: clean
clean:
	rm -rf dist/* || true
	${MAKE} dist/.gitkeep

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
build: 
# 1. Build the "dist/" folder
	${MAKE} vue-build
# 2. Generate a JSON file ("dist/vue-ssr-server-bundle.json") that contains our app content, to be used by the Webpack VueSSRServerPlugin
	${MAKE} generate-server-bundle-json
# 3. Generate a "dist/index.[lang].html" file for each lang, based on the JSON generated during the previous step
	${MAKE} generate-server-html APP_LANG=en
	${MAKE} generate-server-html APP_LANG=fr

.PHONY: generate-pdfs
generate-pdfs:
# Launch the HTTP server, in order to generate the PDF files from the HTML pages. Saves its PID.
	node_modules/.bin/http-server dist/ -p ${PDF_GENERATION_SERVER_PORT} & echo $$! > dist/http-server.pid
# Generates the PDF files
	sleep 1
	node bin/create-pdf.js 'http://127.0.0.1:${PDF_GENERATION_SERVER_PORT}' en
	node bin/create-pdf.js 'http://127.0.0.1:${PDF_GENERATION_SERVER_PORT}' fr
# Kills the HTTP server
	kill `cat dist/http-server.pid`
	rm dist/http-server.pid

.PHONY: vue-build
vue-build: 
	./node_modules/.bin/vue-cli-service build
	${MAKE} dist/.gitkeep

.PHONY: lint
lint: 
	./node_modules/.bin/vue-cli-service lint

src/data/resume-data.ts: data/*.toml bin/dump-data.js
	${MAKE} dump-data-to-typescript

src/data/i18n-data.ts: data/*.toml bin/dump-data.js
	${MAKE} dump-data-to-typescript

dist/.gitkeep:
	mkdir dist || true
	touch dist/.gitkeep

dist/index.fr.html: dist/vue-ssr-server-bundle.json dist/index.html
	${MAKE} generate-server-html APP_LANG=fr

dist/index.en.html: dist/vue-ssr-server-bundle.json dist/index.html
	${MAKE} generate-server-html APP_LANG=en

dist/index.html: public/index.html
	${MAKE} build

dist/vue-ssr-server-bundle.json:
	${MAKE} generate-server-bundle
