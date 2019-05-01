import HtmlWebpackPlugin from 'html-webpack-plugin'
import {resolve} from 'path'
import {Configuration} from 'webpack'
import merge from 'webpack-merge'
import readEnvironment from './build/utils/read-environment'
import webpackConfig from './build/webpack.base.config'
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const outputPath = process.env.DIST || 'dist'
const environment: any = readEnvironment()

const config: Configuration = {
  mode,
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: resolve('./', outputPath),
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      inject: true,
      title: 'pug demo',
      metadata: {
        mode: 'development',
        devtool: 'http://localhost:8098',
      },
    }),
  ],
}

module.exports = merge(webpackConfig({
  transpileOnly: mode === 'production',
  mode,
}, environment), config)
