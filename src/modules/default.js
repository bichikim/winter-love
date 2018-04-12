const fs = require('fs-extra')
const {resolve} = require('path')
module.exports = async function defaultModule() {
  const root = this.options.rootDir
  if(!this.options.build){
    this.options.build = {}
  }
  if(!this.options.build.vendor){
    this.options.build.vendor = []
  }
  const {disableLint = false} = this.options
  const packageJson = await fs.readJson(resolve(root, 'package.json'))
  const {name = 'winter love'} = packageJson
  const {vendor = [], title = name} = packageJson
  this.options.build.vendor.concat(vendor)
  this.extendBuild((config, {isDev, isClient}) => {
    /*************************************************
     * Run ESLint on save
     *************************************************/
    if(isDev && isClient && !disableLint){
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
    // if(isClient){
    //   config.module.rules.push({
    //     test: /\.worker\.js/,
    //     loader: 'worker-loader',
    //   })
    // }
    /*************************************************
     * Change alias "~" location from ./${srcDir} to ./lib
     *************************************************/
    config.resolve.alias['~'] = resolve(config.resolve.alias['@@'], 'lib')
  })
  this.options.head.meta.concat([{charset: 'utf-8'}])
  this.options.head.link.concat([{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}])
  this.options.head.titleTemplate = `${title}-%s`
  this.options.plugins.concat([
    '@/plugins/vue-plugins',
  ])
}
