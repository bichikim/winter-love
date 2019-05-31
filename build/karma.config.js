/**
 * Karma settings
 * This test must have packages below
 * karma, karma-chai, karma-sourcemap-loader, karma-spec-reporter, karma-webpack
 * (mocha, chai, karma-coverage)
 * @author Bichi Kim <bichi@live.co.kr>
 */
const webpack = require('./webpack.test.config')
module.exports = function(config) {
  config.set({
    basePath: '../',
    browsers: ['ChromeHeadlessWithoutSecurity'],
    frameworks: ['mocha', 'chai'],
    reporters: ['spec', 'coverage', 'remap-coverage'],
    files: [
      'node_modules/@babel/polyfill/dist/polyfill.js',
      {pattern: 'test/spec/**/*.spec.js', watched: false},
      {pattern: 'test/spec/**/*.spec.ts', watched: false},
    ],
    exclude: [
      'src/**/*.spec.skip.js',
    ],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'src/**/*.ts': ['webpack', 'sourcemap'],
      'test/spec/**/*.js': ['webpack', 'sourcemap'],
      'test/spec/**/*.ts': ['webpack', 'sourcemap'],
    },
    coverageReporter: {
      type: 'in-memory',
    },
    remapCoverageReporter: {
      'text-summary': null,
      lcovonly: './.coverage/lcov.info',
      html: './.coverage/html',
      cobertura: './.coverage/cobertura.xml',
    },
    webpack,
    webpackMiddleware: {
      noInfo: true,
    },
    logLevel: config.LOG_INFO,
    colors: true,
    customLaunchers: {
      ChromeWithoutSecurity: {
        base: 'Chrome',
        flags: ['--disable-web-security'],
      },
      ChromeHeadlessWithoutSecurity: {
        base: 'ChromeHeadless',
        flags: ['--disable-web-security'],
      },
    },
    mime: {
      'text/x-typescript': ['ts'],
    },
  })
}
