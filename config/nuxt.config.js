const {version} = require('../package')
const {resolve} = require('path')
module.exports = {

  srcDir: resolve(__dirname, '../src'),

  rootDir: resolve(__dirname, '../'),

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
  ],

  storeInit: {
    version,
    api: {
      test: 'hi?',
    },
  },

  lint: true,
}
