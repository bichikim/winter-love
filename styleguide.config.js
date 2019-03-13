const {join} = require('path')
const tsNode = require('ts-node')
tsNode.register({project: 'tsconfig.test.json'})
const webpackConfig = require('./build/webpack.base.config.js')
const root = process.cwd()
// set auto register
// refer to ./src/register
process.env.AUTO_REGISTER = true
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
  require: [
    join(root, 'src/register.ts'),
  ],
  webpackConfig: webpackConfig({transpileOnly: false}),
}
