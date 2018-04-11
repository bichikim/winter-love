const packageJson = require('../package')
const {defaultDeep} = require('lodash')
const nuxtDefaultConfig = require('./nuxt.default.config')
const nuxtConfigSkeleton = {
  srcDir: './src',
  rootDir: './',
  head: {
    link: [],
  },
  build: {
    vendor: [],
  },
  plugins: [],
  modules: [],
  css: [],
}
const nuxtConfig = defaultDeep(nuxtDefaultConfig, nuxtConfigSkeleton)
// add more options
const {vendor, title = packageJson.name} = packageJson
const link = [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
nuxtConfig.build.vendor.concat(vendor)
nuxtConfig.head.link.concat(link)
nuxtConfig.head.titleTemplate = `${title}-%s`

module.default = nuxtConfig
