const {join} = require('path')
const tsNode = require('ts-node')
tsNode.register({project: 'tsconfig.test.json'})
const webpackConfig = require('./webpack.config.ts')
// const merge = require('webpack-merge')
// const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')
const root = process.cwd()
module.exports = {
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    if(!webpackConfig.resolve.plugins){
      webpackConfig.resolve.plugins = []
    }
    webpackConfig.resolve.alias['vue-ts'] = join(root, 'src/vue-ts.ts')
    webpackConfig.resolve.alias.types = join(root, 'src/types')
    return webpackConfig
  },
  components: [
    'src/components/**/*.vue',
  ],
  // require: [
  //   join(root, 'src/register.ts'),
  // ],
  webpackConfig: webpackConfig.default || webpackConfig,
}
