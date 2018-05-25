const fs = require('fs-extra')
const {join} = require('path')
module.exports = async function defaultModule() {
  /*************************************************
   * Make sure options exist
   *************************************************/
  if(!this.options){this.options = {}}
  if(!this.options.build){this.options.build = {}}
  if(!this.options.build.vendor){this.options.build.vendor = []}
  if(!this.options.head){this.options.head = {}}
  if(!this.options.head.meta){this.options.head.meta = []}
  if(!this.options.head.script){this.options.head.script = []}

  /*************************************************
   * get options data
   *************************************************/
  const packageJson = await fs.readJson(join(root, 'package.json')) || {}
  const root = this.options.rootDir || './'
  const {lint = false} = this.options
  const {name = 'winter love', vendor = [], title = name, version = 'unknown'} = packageJson

  /*************************************************
   * init env
   *************************************************/
  this.options.env.version = version

  /*************************************************
   * init vendor
   *************************************************/
  this.options.build.vendor.concat(vendor)

  /*************************************************
   * set add more webpack config
   *************************************************/
  this.extendBuild((config, {isDev, isClient}) => {
    /*************************************************
     * Run ESLint on save
     *************************************************/
    if(isDev && isClient && !lint){
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|ts|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      })
    }
    /*************************************************
     * Set Web worker
     *************************************************/
    if(isClient){
      config.module.rules.push({
        test: /\.worker\.js/,
        loader: 'worker-loader',
      })
    }
    /*************************************************
     * Change alias "~" location from ./${srcDir} to ./lib
     *************************************************/
    config.resolve.alias['~'] = join(config.resolve.alias['@'], '../lib')
  })
  /*************************************************
   * meta setting
   *************************************************/
  this.options.head.meta.push({charset: 'utf-8'})
  this.options.head.meta.push({
    name: 'viewport',
    content:
      'width=device-width, initial-scale=1',
  })
  /*************************************************
   * polyfill
   *************************************************/
  this.options.head.script.push({
    src: 'https://cdn.polyfill.io/v2/polyfill.min.js',
  })
  this.options.head.titleTemplate = `${title}-%s`
  this.options.plugins.push('@/plugins/vue-plugins')
  this.options.plugins.push({
    src: '@/plugins/vue-plugins-client',
    ssr: false,
  })
  this.options.css.push({
    src: '@/assets/styles/bootstrap.styl',
    lang: 'stylus',
  })

  this.options.css.push('./node_modules/element-ui/lib/theme-chalk/reset.css')
  this.options.css.push('./node_modules/element-ui/lib/theme-chalk/index.css')
}
