module.exports = function(grunt){
  var paths = {
    frontjs: ['public/app/*.js', 'public/app/**/*.js'],
    backjs: ['routes/*.js', 'models/*.js', 'app.js']
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
      dev: {
        script: './bin/www'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['jshint', 'nodemon']);
}
