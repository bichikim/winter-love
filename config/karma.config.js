/**
 * @author Bichi Kim <bichi@live.co.kr> <bichi@pjfactory.com>
 */
const webpack = require('./webpack.config.js')
module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'sinon'],
    reporters: ['spec', 'coverage'],
    files: [
      '../node_modules/babel-polyfill/dist/polyfill.js',
      {pattern: '../lib/**/*.spec.js', watched: true},
      {pattern: '../src/**/*.spec.js', watched: true},
      {pattern: '../build/**/*.spec.js', watched: true},
      {pattern: '../lib/**/*.spec.ts', watched: true},
      {pattern: '../src/**/*.spec.ts', watched: true},
      {pattern: '../build/**/*.spec.ts', watched: true},
      {pattern: '../test/unit/specs/**/*.spec.js', watched: true},
    ],
    exclude: [
      '../lib/**/*.spec.skip.js',
      '../src/**/*.spec.skip.ts',
      '../build/**/*.spec.skip.ts',
    ],
    preprocessors: {
      '../lib/**/*.js': ['webpack', 'sourcemap'],
      '../lib/**/*.ts': ['webpack', 'sourcemap'],
      '../src/**/*.js': ['webpack', 'sourcemap'],
      '../src/**/*.ts': ['webpack', 'sourcemap'],
      '../build/**/*.js': ['webpack', 'sourcemap'],
      '../build/**/*.ts': ['webpack', 'sourcemap'],
      './test/unit/specs/**/*.js': ['webpack', 'sourcemap'],
    },
    coverageReporter: {
      dir : '../coverage/',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcovonly', subdir: 'lcov'},
        {type: 'cobertura', subdir: 'cobertura'},
        {type: 'text-summary'},
      ],
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
    },
    mime: {
      'text/x-typescript': ['ts'],
    },
  })
}
