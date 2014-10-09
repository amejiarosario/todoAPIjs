module.exports = function(grunt){
  var paths = {
    frontjs: ['public/app/*.js', 'public/app/**/*.js'],
    backjs: ['routes/*.js', 'models/*.js']
  };

  grunt.config.init({
    jshint: {
      all: {
        src: paths.frontjs.concat(paths.backjs),
        options: {
          jshintrc: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
}
