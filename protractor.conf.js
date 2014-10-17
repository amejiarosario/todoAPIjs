// https://github.com/teerapap/grunt-protractor-runner

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'public/app/**/test/e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
