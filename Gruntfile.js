module.exports = function(grunt){
  var paths = {
    backend: {
      js: ['server/**/*.js', 'server.js', '!server/**/tests/*.js'],
      templates: ['server/**/*.ejs'],
      tests: ['server/**/tests/*.js']
    },

    frontend: {
      js: ['public/app/{,*/}*.js'],
      templates: ['public/app/**/*.html'],
      tests: []
    }
  };

  grunt.config.init({
    jshint: {
      options: {
        jshintrc: true
      },
      frontend: {
        src: paths.frontend.js,
      },
      backend: {
        src: paths.backend.js
      },
      backendTests: {
        src: paths.backend.tests
      },
      frontendTests: {
        src: paths.frontend.tests
      }
    },

    nodemon: {
      options: {
        watch: paths.backend.js.concat(paths.backend.templates),
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
        files: paths.frontend.js.concat(['.rebooted']),
        tasks: ['lint'],
      },
      tests: {
        options: {
          spawn: true // needed for mocha tests
        },
        files: paths.backend.tests,
        tasks: ['lint', 'test'],
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      target: ['nodemon', 'watch:code']
    },

    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'server.js'
      },
      src: paths.backend.tests
    },

    env: {
      test: {
        NODE_ENV: 'test'
      }
    }
  });

  // contrib tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');

  // Grunt tasks
  grunt.registerTask('default', ['lint', 'test', 'concurrent']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['env:test', 'mochaTest'/*, 'karma:unit'*/]);
  grunt.registerTask('wtest', [/*'test',*/ 'watch:tests']);
}
