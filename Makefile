NODE_ENV ?= development
NODE_BIN_PATH ?= ./node_modules/.bin/
TS_NODE_OPTS ?= # `-T` is a useful one once the scripts are mature, really makes the while thing much faster :-)


generate-html-pages:
	${MAKE} --no-print-directory generate-html-page LANG_CODE=en
	${MAKE} --no-print-directory generate-html-page LANG_CODE=fr

.PHONY: hello
generate-html-page: LANG_CODE ?= en
generate-html-page: node_modules src/data/i18n-data.ts src/data/resume-data.ts
	LANG_CODE=${LANG_CODE} ${NODE_BIN_PATH}ts-node ${TS_NODE_OPTS} bin/generate-html-page.tsx

src/data/%.ts: data/*.toml
	${NODE_BIN_PATH}ts-node ${TS_NODE_OPTS} bin/toml-to-typescript.ts

.PHONY: dist/css/main.css
dist/css/main.css: POST_CSS_ARGS ?= --no-map
dist/css/main.css:
	${NODE_BIN_PATH}postcss --env ${NODE_ENV} ${POST_CSS_ARGS} assets/css/main.css -o dist/css/main.css

node_modules:
	yarn install
