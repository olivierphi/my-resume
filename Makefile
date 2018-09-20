
.PHONY: install
install:
	yarn install
	${MAKE} src/data/resume-data.ts

.PHONY: clean
clean:
	rm -rf dist/* || true

.PHONY: generate-server-bundle-json
generate-server-bundle-json:
	./node_modules/.bin/webpack-cli --config bin/generate-static.webpack-config.js

.PHONY: generate-server-html
generate-server-html: 
	NO_SERVICE_WORKER=1 node -r esm bin/generate-static-html.js "$$(pwd)/dist/" ${APP_LANG}

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

.PHONY: vue-build
vue-build: 
	./node_modules/.bin/vue-cli-service build

.PHONY: lint
lint: 
	./node_modules/.bin/vue-cli-service lint

src/data/resume-data.ts: data/*.toml bin/dump-data.js
	${MAKE} dump-data-to-typescript

dist/index.fr.html: dist/vue-ssr-server-bundle.json dist/index.html
	${MAKE} generate-server-html APP_LANG=fr

dist/index.en.html: dist/vue-ssr-server-bundle.json dist/index.html
	${MAKE} generate-server-html APP_LANG=en

dist/index.html: public/index.html
	${MAKE} build

dist/vue-ssr-server-bundle.json:
	${MAKE} generate-server-bundle
