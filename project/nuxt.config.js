const {version} = require('../package')
const {readFileSync} = require('fs')
const deepMerge = require('deepmerge')
const {join} = require('path')
const babel = () => {
  try{
    const content = readFileSync(join(__dirname, '../.babelrc'))
    return JSON.parse(content)
  }catch(err){
    return {}
  }
}
const nuxtConfig = () => {
  try{
    const config = readFileSync(join(__dirname, '../.nuxt.config.js'))
    return JSON.parse(config)
  }catch(e){
    return {}
  }
}
const project = (path) => {
  return join(__dirname, path)
}

const defaultConfig = {

  srcDir: './src',

  rootDir: './',

  /**
   * Webpack build
   */
  build: {
    babel: babel(), extractCSS: true, cssSourceMap: true, optimization: {
      splitChunks: {
        name: true,
      },
    },
  },

  /*
   ** Customize the progress bar color
   */
  loading: {color: '#3B8070'},

  /*
   ** Build configuration
   */
  modules: [
    // default setting
    project('modules/default'),
    // for typescript
    project('modules/typescript'),
    // for i18n
    [project('modules/i18n'), {
        languages: [{locale: 'kr'}],
        defaultLocale: 'en',
    }],
    '@nuxtjs/component-cache',
    project('modules/no-test-page'),
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
  ],

  env: {
    // inti store data
    store: {
      // use this in vue-plugin
      app: {
        version,
      }, api: {
        test: 'hi?',
      },
    },
  },

  // 프로젝트 설정
  project: {
    // toggle using cdn polyfill
    // default: true
    polyfill: true, // toggle checking lint in building time
    // default: false
    lint: true, // toggle pwa mode
    // default: false
    pwa: true, // toggle remove all Test page in production
    // default: true
    noTestPage: true,

    componentCache: true,
  },
}
module.exports = deepMerge(nuxtConfig(), defaultConfig)
