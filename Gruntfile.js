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
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
}
