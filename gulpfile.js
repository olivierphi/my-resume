// Node.js core modules
var path = require('path');

// Gulp core
var gulp = require('gulp');
// Gulp plugins
var less = require('gulp-less');
var rename = require("gulp-rename");
var exec = require('gulp-exec');
var lr = require('tiny-lr'), refresh = require('gulp-livereload'), server = lr();//LiveReload stuff

// We still miss the "deployment" Grunt plugin in gulp ; let's use the Gruntfile tasks in gulp!
var gulp_grunt = require('gulp-grunt');
gulp_grunt(gulp);

// Misc init setup...
var PROD, DEV, ENV;// will be initialized by the "setup" task

// Setup stuff
gulp.task('setup', function () {

    PROD = !! gulp.env.production;
    DEV = ! PROD;
    ENV = PROD ? 'production' : 'development';
    console.log("Gulp env : ", ENV);
    
});
// end setup

// LESS stuff
gulp.task('less', ['setup'], function () {
    
    var LESS_OPTS = DEV ? {} : { compress: true } ;
    
    var stream = gulp.src('css/main.less')
        .pipe(less(LESS_OPTS));
    
    if (PROD) {
        stream = stream.pipe(rename(function (dir, base, ext) {
            return base + '.min' + ext;
        }));
    }
    
    stream.pipe(gulp.dest('css/'))
          .pipe(refresh(server));//LiveReload refresh

    return stream;
    
});
// end LESS

// Exec stuff
gulp.task('generate-page', ['setup'], function() {
    var options = {
        env: ENV
    };
    var stream = gulp.src('.')
        .pipe(exec('python gen.py <%= options.env %>', options))
        .pipe(refresh(server));//LiveReload refresh

    return stream;
});
// end exec


gulp.task('compile-all', function () {
   gulp.run('less', 'generate-page');
});

gulp.task('default', function () {
   gulp.run('compile-all');
});

gulp.task('deploy', function () {
   gulp.env.production = true;//we force the "production" mode for this task!
   gulp.run('compile-all', 'grunt-sftp');
});

gulp.task('watch', ['setup'], function () {
    
    var LESS_FILES = ['css/*.less'];
    var HTML_RELATED_FILES = ['gen.py', 'template.jinja', 'data/**/*.yml'];
    
    gulp.watch(LESS_FILES, function(event) {
        console.log('File '+event.path+' was '+event.type+', running tasks...');
        gulp.run('less');
    });
    gulp.watch(HTML_RELATED_FILES, function(event) {
        console.log('File '+event.path+' was '+event.type+', running tasks...');
        gulp.run('generate-page');
    });
    
    
    // LiveReload FTW!
    server.listen(35729, function (err) {
        if (err) return console.log(err);
    });
    
    
    // First execution at "gulp watch" run
    gulp.run('compile-all');
});
