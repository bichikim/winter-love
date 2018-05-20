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
    '@/modules/store-init',
    '@/modules/typescript',
    '@/modules/no-test-page',
    '@nuxtjs/pwa',
  ],

  // inti store data
  store: {
    version,
    api: {
      test: 'hi?',
    },
  },

  lint: true,
}
