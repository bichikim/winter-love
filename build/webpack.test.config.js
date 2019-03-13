const webpack =  require('webpack')
const webpackMerge  = require('webpack-merge')
const webpackBaseConfigFn = require('./webpack.base.config')
const webpackBaseConfig = webpackBaseConfigFn({transpileOnly: true})

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
    }),
  ],
})
