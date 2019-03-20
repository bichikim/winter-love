// ts setting
const tsNode = require('ts-node')
tsNode.register({
  project: environment.typescript.nodeProject,
})

// importing
const {resolve} = require('path')
const environment = require('./read-environment')

// map configs
const styleguidist = environment || {}
const {
  styleguideDir = '.styleguidist',
  serverHost = 'localhost',
} = styleguidist || {}
const components = (styleguidist.components || ['./src/components/**/*.vue'])
  .map((path) => (resolve(path)))

const _require = (styleguidist.require || ['./build/styleguidist.register.ts'])
  .map((path) => (resolve(path)))
const webpackConfigModule = require('./webpack.base.config.ts')
const webpackConfig = webpackConfigModule.default || webpackConfigModule

// export styleguidist setting
module.exports = {
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    if(!webpackConfig.resolve.plugins){
      webpackConfig.resolve.plugins = []
    }
    webpackConfig.resolve.alias['vue-ts'] = resolve('./src/vue-ts.ts')
    webpackConfig.resolve.alias.types = resolve('./src/types')
    return webpackConfig
  },
  serverHost,
  styleguideDir: resolve(styleguideDir),
  components,
  require: _require,
  webpackConfig: webpackConfig({transpileOnly: false}),
}
