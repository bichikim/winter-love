const {version} = require('../package')
module.exports = {

  srcDir: './src',

  rootDir: './',

  build: {
    presets: ['vue-app'],
    babel: {
      plugins: ['graphql-tag'],
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
    '@/modules/default',
    // for typescript
    '@/modules/typescript',
  ],

  env:{
    // inti store data
    store: {
      // use this in vue-plugin
      app: {
        version,
      },
      api: {
        test: 'hi?',
      },
    },
  },

  // 프로젝트 설정
  project: {
    // toggle using cdn polyfill
    // default: true
    polyfill: true,
    // toggle checking lint in building time
    // default: false
    lint: true,
    // toggle pwa mode
    // default: false
    pwa: true,
    // toggle remove all Test page in production
    // default: true
    noTestPage: true,
  },
}
