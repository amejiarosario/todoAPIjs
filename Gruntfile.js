module.exports = function(grunt){
  var paths = {
    frontjs: ['public/app/*.js', 'public/app/**/*.js'],
    backjs: ['routes/*.js', 'models/*.js', 'app.js'],
    html: ['public/app/**/*.html'],
  };

  grunt.config.init({
    jshint: {
      options: {
        jshintrc: true
      },
      frontend: {
        src: paths.frontjs,
      },
      backend: {
        src: paths.backjs
      }
    },

    nodemon: {
      options: {
        watch: paths.backjs,
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
      options: {
        spawn: false,
        livereload: true,
      },
      scripts: {
        files: paths.frontjs.concat(paths.html).concat(['.rebooted']),
        tasks: ['jshint'],
      },
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      target: ['nodemon', 'watch']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['jshint', 'concurrent']);
}
