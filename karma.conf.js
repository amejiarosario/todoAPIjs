// Karma configuration
// Generated on Tue Oct 14 2014 14:02:26 GMT-0400 (AST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'public',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'vendors/angular/angular.js',
      'vendors/angular-mocks/angular-mocks.js',
      'vendors/angular-route/angular-route.js',
      'vendors/angular-resource/angular-resource.js',
      'app/*.js',
      'app/**/*.js',
    ],


    // list of files to exclude
    exclude: [
      'app/**/test/e2e/*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      reporters:[
        { type: 'html', dir:'coverage/' },
        { type: 'text' },
        { type: 'text-summary' }
      ],
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
