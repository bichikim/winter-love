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
    // for typescript
    '@/modules/typescript',
    // remove all test page on production mode
    '@/modules/no-test-page',
    // onesignal must be before pwa
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
  ],

  // inti store data
  store: {
    // use this in vue-plugin
    version,
    api: {
      test: 'hi?',
    },
  },


  project: {
    lint: true,
  },
}
