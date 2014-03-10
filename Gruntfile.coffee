module.exports = (grunt)->

  # Misc init setup...
  SRC = "src/"
  BIN = "bin/"
  SRC_ASSETS= "#{SRC}/assets/"
  BIN_ASSETS = "#{BIN}"
    
  
  # Project configuration.
  grunt.initConfig({

    # LESS stuff
    less: {
      development: {
        options: {
        }
        files: [{
          src: "#{BIN_ASSETS}css/main.css"
          dest: "#{SRC_ASSETS}css/main.less"
        }]
      } # end less:development
      production: {
        options: {
          compress: true
          cleancss: true
          strictImports: true
        }
        files: [{
          src: "#{BIN_ASSETS}css/main.min.css"
          dest: "#{SRC_ASSETS}css/main.less"
        }]
      } # end less:production
    }
    # end LESS

    # Watch stuff
    watch: {
      options: {
        atBegin: true
        livereload: true
      }
      "less": {
        files: ["#{SRC_ASSETS}css/*.less"]
        tasks: ['less']
      }
      "html-template": {
        files: ["#{SRC}html-generation/*.*", 'template.jinja', "#{SRC}data/**/*.yml"]
        tasks: ['generate-page']
      }
    }
    # end watch

    # Deployment stuff
    sshconfig: {
      "rougemine": grunt.file.readJSON('ssh-config.json')
    },
    sftp: {
      rougemine: {
        files: {
          "./": ["#{BIN}index.php", "#{BIN}index.fr.html", "#{BIN}index.en.html", "#{BIN}css/main.min.css"]
        }
        options: {
          config: 'rougemine'
          srcBasePath: BIN
        }
      }
    }
    # end deployment

    'env': 'development' # default ENV

  })


  # Load the plugins for our tasks.
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-exec')
  grunt.loadNpmTasks('grunt-ssh')

  # Custom tasks
  grunt.registerTask('compile-all-prod', ()->
    grunt.config('env', 'production')
    grunt.task.run(['less:production', 'generate-page'])
  )

  grunt.registerTask('compile-all-dev', ()->
    grunt.config('env', 'development')
    grunt.task.run(['less:development', 'generate-page'])
  )

  grunt.registerTask('generate-page', ()->
    htmlGeneration = require "./src/html-generation"
    htmlGeneration.generatePages(grunt.config('env'))
  )

  grunt.registerTask('deploy', ()->
    grunt.task.run(['sftp'])
  )

  # Default task(s).
  grunt.registerTask('default', ['compile-all-prod'])