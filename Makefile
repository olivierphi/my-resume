
.PHONY: install
install:
	yarn install
	${MAKE} src/data/resume-data.ts

src/data/resume-data.ts: data/*.toml
	node -r esm bin/dump-data.js

.PHONY: serve
serve: 
	./node_modules/.bin/vue-cli-service serve

.PHONY: build
build: 
	./node_modules/.bin/vue-cli-service build

.PHONY: lint
lint: 
	./node_modules/.bin/vue-cli-service lint
