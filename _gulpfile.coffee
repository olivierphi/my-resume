# Node.js core modules
path = require "path"

# Gulp core
gulp = require "gulp"

# Gulp plugins
less = require "gulp-less"
rename = require "gulp-rename"
clean = require "gulp-clean"
ignore = require "gulp-ignore"
lr = require "tiny-lr" #LiveReload stuff
refresh = require "gulp-livereload"
server = lr()

# We still miss the "deployment" Grunt plugin in gulp ; let's use the Gruntfile tasks in gulp!
gulp_grunt = require "gulp-grunt"
gulp_grunt(gulp)

# Misc init setup...
PROD = DEV = ENV = undefined # thse will be initialized by the "setup" task
SRC = "./src/"
BIN = "./bin/"
SRC_ASSETS= "#{SRC}/assets/"

# Setup stuff
gulp.task "setup", ["clean"], ->
  PROD = !!gulp.env.production
  DEV = not PROD
  ENV = if PROD then "production" else "development"
  console.log "Gulp env : ", ENV
# end setup

# Clean stuff
gulp.task "clean", [], ->
  #stream = gulp.src(BIN).pipe(clean())
  #stream
# end clean

# Copy stuff
gulp.task "copy-assets-to-bin", ["setup"], ->
  
  # CSS files
  gulp.src("#{SRC_ASSETS}css/**/*.css").pipe(gulp.dest("#{BIN}css/"))
  
  # Images
  gulp.src("#{SRC_ASSETS}img/**/*")
    .pipe(ignore({pattern: [
      "**/raw/**"
      "**/*.svg"
    ]}))
    .pipe(gulp.dest("#{BIN}img/"))
  
  # Scripts
  gulp.src("#{SRC_ASSETS}js/**/*").pipe(gulp.dest("#{BIN}js/"))
  
  # Last but not least... our favicon, PHP script and PDF files :-)
  gulp.src([
    "#{SRC}index.php"
    "#{SRC_ASSETS}favicon.ico"
    "#{SRC_ASSETS}cv-*.pdf"
  ])
    .pipe(gulp.dest(BIN))
  
# end copy

# LESS stuff
gulp.task "less", ["setup"], ->
  
  LESS_OPTS = if DEV then {} else {compress: true}
    
  stream = gulp.src("#{SRC_ASSETS}css/main.less").pipe(less(LESS_OPTS))
  if PROD
    stream = stream.pipe(rename((dir, base, ext) ->
      base + ".min" + ext
    ))

  stream = stream.pipe(gulp.dest("#{BIN}css/"))
  stream = stream.pipe(refresh(server)) #LiveReload refresh
  
  stream
# end LESS

# Exec stuff
gulp.task "generate-page", ["setup"], ->
  htmlGeneration = require "./src/html-generation"
  htmlGeneration.generatePages(ENV)
  
  gulp.src("#{BIN}/*.html").pipe(refresh(server)) #LiveReload refresh
# end exec


gulp.task "compile-all", ->
  gulp.run "copy-assets-to-bin", "less", "generate-page"

gulp.task "default", ->
  gulp.run "compile-all"

gulp.task "deploy", ->
  gulp.env.production = true #we force the "production" mode for this task!
  gulp.run "compile-all", "grunt-deploy"

gulp.task "watch", ["setup"], ->
  
  LESS_FILES = ["#{SRC_ASSETS}css/*.less"]
  HTML_RELATED_FILES = ["#{SRC}html-generation/*.*", "#{SRC}data/**/*.yml"]
  
  gulp.watch LESS_FILES, (event) ->
    console.log "File " + event.path + " was " + event.type + ", running tasks..."
    gulp.run "less"

  gulp.watch HTML_RELATED_FILES, (event) ->
    console.log "File " + event.path + " was " + event.type + ", running tasks..."
    gulp.run "generate-page"


  # LiveReload FTW!
  server.listen 35729, (err) ->
    console.log err  if err


  # First execution at "gulp watch" run
  gulp.run "compile-all"
