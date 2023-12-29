PYTHON_BINS ?= .venv/bin
PYTHON ?= ${PYTHON_BINS}/python
PYTHONPATH ?= ${PWD}/src
DJANGO_SETTINGS_MODULE ?= project.settings.development
SUB_MAKE = ${MAKE} --no-print-directory

.DEFAULT_GOAL := help

help:
# @link https://github.com/marmelab/javascript-boilerplate/blob/master/makefile
	@grep -P '^[a-zA-Z/_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: .venv python_deps ${PYTHON_BINS}/tailwindcss ## Install the Python and frontend dependencies
	${PYTHON_BINS}/pre-commit install

.PHONY: dev
dev: install
	@rm -rf dist/ || true
	@mkdir -p dist/
	@${MAKE} --no-print-directory --jobs=2 dev_watchfiles dev_webserver



# Here starts the "misc util targets" stuff

.venv: poetry_version ?= 1.7.1
.venv: ## Initialises the Python virtual environment in a ".venv" folder
	@python -m venv .venv
	@${PYTHON_BINS}/pip install -U pip poetry==${poetry_version}

.PHONY: python_deps
python_deps: ## Installs the Python dependencies
	@${PYTHON_BINS}/poetry install --no-root

.PHONY: dev_watchfiles
dev_watchfiles:
	@RESUME_DEBUG=1 ${PYTHON_BINS}/watchfiles "${PYTHON} -m myresume.tools.build_html_and_css" myresume/

.PHONY: dev_webserver
dev_webserver: address ?= 127.0.0.1
dev_webserver: port ?= 8000
dev_webserver: ## Starts the development webserver
	@${PYTHON} -m http.server --directory dist --bind ${address} ${port}

${PYTHON_BINS}/tailwindcss: tailwindcss_version ?= v3.4.0
${PYTHON_BINS}/tailwindcss: ## Installs the Tailwind CLI
	@TAILWINDCSS_VERSION=${tailwindcss_version} ${PYTHON_BINS}/tailwindcss_install
