// This file is just a JavaScript wrapper around the real script
// (i.e. "_gen-cli.coffee")

require("coffee-script");

// Go! Go! Go!
genCli = require("./_gen-cli");
genCli.generatePages();
