const webpack =  require('webpack')
const webpackMerge  = require('webpack-merge')
const webpackBaseConfigFn = require('./utils/read-ts')('build/webpack.base.config.ts')
const webpackBaseConfig = webpackBaseConfigFn(
  {
    transpileOnly: true,
  },
  {
    path: {
      middleware: 'mock-data/middleware',
      layouts: 'mock-data/layouts',
      pages: 'mock-data/pages',
      src: 'test',
    },
  },
)

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
    }),
  ],
})
