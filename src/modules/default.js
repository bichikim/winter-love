const fs = require('fs-extra')
const {join, resolve} = require('path')
module.exports = async function defaultModule() {
  const root = this.options.rootDir
  if(!this.options.build){
    this.options.build = {}
  }
  if(!this.options.build.vendor){
    this.options.build.vendor = []
  }
  const {lint = false} = this.options
  const packageJson = await fs.readJson(join(root, 'package.json'))
  const {name = 'winter love'} = packageJson
  const {vendor, title = name} = packageJson
  this.options.build.vendor.concat(vendor)
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
  this.options.head.meta.push({charset: 'utf-8'})
  this.options.head.link.push({rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'})
  this.options.head.titleTemplate = `${title}-%s`
  this.options.plugins.push('@/plugins/vue-plugins')
  this.options.plugins.push({src: '@/plugins/vue-plugins-client', ssr: false})
  this.options.css.push({src: '@/assets/styles/bootstrap.styl', lang: 'stylus'})
  this.options.css.push('./node_modules/element-ui/lib/theme-chalk/reset.css')
  this.options.css.push('./node_modules/element-ui/lib/theme-chalk/index.css')
}
