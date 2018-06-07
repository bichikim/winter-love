const {version} = require('../package')
module.exports = {

  srcDir: './src',

  rootDir: './',

  /*
   ** Customize the progress bar color
   */
  loading: {color: '#3B8070'},

  /*
   ** Build configuration
   */
  modules: [
    '@/modules/default',
    // store init options from nuxt.config.js > store
    '@/modules/store-init',
    // 'nuxt-typescript',
    // for typescript
    '@/modules/typescript',
    // remove all test page on production mode
    '@/modules/no-test-page',
  ],

  // inti store data
  store: {
    // use this in vue-plugin
    version,
    api: {
      test: 'hi?',
    },
  },

  // 프로젝트 설정
  project: {
    polyfill: true,
    lint: true,
    pwa: true,
  },
}
