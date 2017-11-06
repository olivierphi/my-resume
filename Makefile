install:
	cd api && yarn install && cd -
	yarn install

build:
	# Clean "dist/" & "var/" folders
	yarn clean && rm -rf var/*
	# Dump YAML files data to JSON files in the "var/" folder
	yarn api:dump
	# Build react JS file, CSS & img assets, and index.html in the "dist/" folder
	GA_TRACKING_ID=${GA_TRACKING_ID} NON_INTERACTIVE=1 yarn webapp:prod:build
	# Generate "index.en.html" & "index.fr.html" from "index.html", copies "index.php" to "dist/"
	yarn ssr:webpack && yarn ssr:render
	# Launch the HTTP server, in order to generate the PDF files from the HTML pages. Saves its PID.
	node_modules/.bin/http-server dist/ -p 8000 & echo $$! > var/http-server.pid
	# Generates the PDF files
	sleep 1
	yarn pdf:render
	# Kills the HTTP server
	kill `cat var/http-server.pid`