fs = require "fs"
path = require "path"

_ = require "lodash"
yaml = require "yaml-js"
jade = require "jade"
moment = require "moment"

debug = false

LANGS = ['fr', 'en']
DATA_PATH = path.join __dirname, "../data/"
BIN_PATH = path.join __dirname, "../../bin/"

getYamlData = (filePath)->
  debug && console.info("getYamlData(#{filePath})")
  fileContent = fs.readFileSync(filePath, {encoding: 'utf8'})
  debug && console.info("fileContent=[#{fileContent.length}]")
  data = yaml.load( fileContent )
  debug && console.info("data=(#{data.length})")
  data
  
renderTemplate = (filePath, locals)->
  debug && console.info("renderTemplate(#{filePath})")
  jadeOpts = { pretty: true }
  # Some "View helpers"
  locals.translate = translate
  locals.moment = moment(new Date())
  # Jade rendering!
  result = jade.renderFile(filePath, _.merge(jadeOpts, locals))
  # We have to manually handle the "lang" attribute in HTML5 conditional comments... :-/
  result = result.replace(/#\{lang\}/g, CURRENT_LANG)
  result

CURRENT_LANG = null
I18N_REGISTRY = {}
  
initI18n = ()->
  for lang in LANGS
    I18N_REGISTRY[lang] = getYamlData("#{DATA_PATH}#{lang}/i18n.yml")
  return
  
translate = (key)=>
  I18N_REGISTRY[CURRENT_LANG][key]

generate = (env)->
  
  templatePath = path.join __dirname, "html-template.jade"
  for lang in LANGS
    CURRENT_LANG = lang
    templateData = {
      'technologies': getYamlData("#{DATA_PATH}technologies.yml")
      'tools': getYamlData("#{DATA_PATH}tools.yml")
      'misc': getYamlData("#{DATA_PATH}misc.yml")
      'works': getYamlData("#{DATA_PATH}#{lang}/works.yml")
      'experiences': getYamlData("#{DATA_PATH}#{lang}/experiences.yml")
      'env': env
      'lang': lang
    }
    result = renderTemplate(templatePath, templateData)
    fs.writeFileSync("#{BIN_PATH}index.#{lang}.html", result)
    
  return

generatePages = exports.generatePages = (env = 'production')->
  initI18n()
  generate(env)
  
