const {resolve} = require('path')
const tsNode = require('ts-node')
tsNode.register({
  project: 'tsconfig.test.json',
})
const webpackConfigModule = require('./webpack.base.config.ts')
const webpackConfig = webpackConfigModule.default || webpackConfigModule

// set auto register
// refer to ./src/register
module.exports = {
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    if(!webpackConfig.resolve.plugins){
      webpackConfig.resolve.plugins = []
    }
    webpackConfig.resolve.alias['vue-ts'] = resolve('./src/vue-ts.ts')
    webpackConfig.resolve.alias.types = resolve('./src/types')
    return webpackConfig
  },
  serverHost: 'localhost',
  styleguideDir: resolve('styleguide'),
  components: [
    '../src/components/**/*.vue',
  ],
  logger: {
    error: (m) => {
      throw new Error(m)
    },
  },
  require: [
    resolve('./build/styleguide.register.ts'),
  ],
  webpackConfig: webpackConfig({transpileOnly: false}),
}
