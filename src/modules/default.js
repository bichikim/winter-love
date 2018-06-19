const fs = require('fs-extra')
const {join} = require('path')

module.exports = async function defaultModule() {
  // console.log(Object.getOwnPropertyNames(this.nuxt))
  proofOptions.call(this)
  this.nuxt.hi = 'hi'
  const defaultOptions = await getOptions.call(this) || {}
  setModules.call(this, defaultOptions)
  setEnv.call(this, defaultOptions)
  setBuild.call(this, defaultOptions)
  setMeta.call(this, defaultOptions)
  setTitle.call(this, defaultOptions)
  setPlugins.call(this, defaultOptions)
  setCss.call(this, defaultOptions)
}

// make sure nuxt options is not empty
function proofOptions() {
  if(!this.options){this.options = {}}
  if(!this.options.modules){this.options.modules = []}
  if(!this.options.build){this.options.build = {}}
  if(!this.options.build.vendor){this.options.build.vendor = []}
  if(!this.options.build.babel.plugins){this.options.build.babel.plugins = []}
  if(!this.options.head){this.options.head = {}}
  if(!this.options.head.meta){this.options.head.meta = []}
  if(!this.options.head.script){this.options.head.script = []}
  if(!this.options.router){this.options.router = {}}
  if(!this.options.router.middleware){this.options.router.middleware = []}
  if(!this.options.css){this.options.css = []}
}

async function getOptions() {
  const root = this.options.rootDir
  const {dev = false} = this.options
  const {project} = this.options
  const {lint = false, polyfill = true, analyzer = true, pwa = {}, noTestPage = true} = project
  const packageJson = await fs.readJson(join(root, 'package.json')) || {}
  const {name = 'winter love'} = packageJson
  const {vendor = [], title = name, version = 'unknown'} = packageJson
  return {
    root, lint, polyfill, vendor, title, version, analyzer, dev, pwa, noTestPage,
  }
}

function setEnv({version} = {}) {
  this.options.env.version = version
}

function setBuild({lint, vendor, dev, analyzer} = {}) {
  // {lint vendor dev analyzer} has an init value already so do not need to set init value twice
  const {build} = this.options
  build.vendor = [...build.vendor, ...vendor]
  if(dev){build.analyze = analyzer}
  // todo this is not working for now. this will be able in nuxt 2.0
  build.babel.plugins = [...build.babel.plugins, 'lodash']
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
}

function setMeta() {
  this.options.head.meta.push({charset: 'utf-8'})
  this.options.head.meta.push({name: 'viewport', content: 'width=device-width, initial-scale=1'})
}

function setTitle({title} = {}) {
  this.options.head.titleTemplate = `${title}-%s`
}

function setPlugins() {
  this.options.plugins.push('@/plugins/vue-plugins')
  this.options.plugins.push({src: '@/plugins/vue-plugins-client', ssr: false})
  this.options.plugins.push('@/plugins/vuex-init')
  this.options.css.push({src: '@/assets/styles/bootstrap.styl', lang: 'stylus'})
}

function setCss() {
  this.options.css.push('./node_modules/element-ui/lib/theme-chalk/reset.css')
  this.options.css.push('./node_modules/element-ui/lib/theme-chalk/index.css')
}

function setModules(options = {}) {
  const {pwa, noTestPage} = options
  if(pwa){
    if(pwa.oneSignal){
      this.options.modules.push('@nuxtjs/onesignal')
    }
    this.options.modules.push('@nuxtjs/pwa')
  }
  if(noTestPage){
    // remove all test page on production mode
    this.options.modules.push('@/modules/no-test-page')
  }
}
