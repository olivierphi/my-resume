NODE_ENV ?= development
NODE_BIN_PATH ?= ./node_modules/.bin/

.PHONY: hello
hello: src/data/i18n-data.ts src/data/resume-data.ts
	echo hi

src/data/%.ts: data/*.toml
	${NODE_BIN_PATH}ts-node bin/toml-to-typescript.ts

.PHONY: dist/css/main.css
dist/css/main.css: POST_CSS_ARGS ?= --no-map
dist/css/main.css:
	postcss --env ${NODE_ENV} ${POST_CSS_ARGS} assets/css/main.css -o dist/css/main.css
