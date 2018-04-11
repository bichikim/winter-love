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
    '@/modules/router',
    '../lib/store-init',
    '@/modules/typescript',
  ],

  storeInit: {
    api: {
      test: 'hi?',
    },
  },
}
