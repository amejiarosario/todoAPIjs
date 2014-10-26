module.exports = function(grunt){
  var paths = {
    server: {
      js: ['server/**/*.js', 'server.js', '!server/**/tests/*.js'],
      templates: ['server/**/*.ejs'],
      tests: ['server/**/tests/*.js']
    },

    client: {
      js: ['public/app/{,*/}*.js', '!public/app/**/tests/*.js'],
      templates: ['public/app/**/*.html'],
      tests: ['public/app/**/tests/*.js']
    }
  };

  grunt.config.init({
    jshint: {
      options: {
        jshintrc: true
      },
      client: {
        src: paths.client.js,
      },
      server: {
        src: paths.server.js
      },
      serverTests: {
        src: paths.server.tests
      },
      clientTests: {
        src: paths.client.tests
      }
    },

    nodemon: {
      options: {
        watch: paths.server.js.concat(paths.server.templates),
        callback: function (nodemon) {
          nodemon.on('log', function (event) {
            console.log(event.colour);
          });

          nodemon.on('restart', function () {
            require('fs').writeFileSync('.rebooted', 'rebooted');
          });
        }
      },
      dev: {
        script: './bin/www'
      },
    },

    watch: {
      code: {
        options: {
          livereload: true,
          spawn: false
        },
        files: paths.client.js.concat(['.rebooted']),
        tasks: ['lint'],
      },
      tests: {
        options: {
          spawn: true // needed for mocha tests
        },
        files: paths.server.tests,
        tasks: ['lint', 'test'],
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['nodemon', 'watch:code'],
      test: ['nodemon', ]
    },

    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'server.js'
      },
      src: paths.server.tests
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      dev: {
        NODE_ENV: 'development'
      }
    },

    shell: {
      mongo: {
        command: "sh ./bin/startMongoIfNotRunning.sh",
        options: {
          async: true
        }
      },
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    protractor: {
      e2e: {
        configFile: "protractor.conf.js"
      },
    },
  });

  // contrib tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Grunt tasks
  grunt.registerTask('default', ['shell:mongo', 'lint', 'test', 'env:dev', 'concurrent']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('e2e', ['env:test', 'nodemon', 'protractor:e2e']);
  grunt.registerTask('test', ['shell:mongo', 'env:test', 'mochaTest', 'karma:unit', 'e2e']);
  grunt.registerTask('wtest', [/*'test',*/ 'watch:tests']);
}
