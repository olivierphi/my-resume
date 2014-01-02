argv = require("optimist").argv
genLib = require "./index"

debug = false

env = 'production'
if argv.env
  env = argv.env

debug && console.info("env=#{env}")

generatePages = exports.generatePages = ()->
  genLib.generatePages(env)
 