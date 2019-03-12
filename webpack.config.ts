import HtmlWebpackPlugin from 'html-webpack-plugin'
import {join} from 'path'
import webpack, {Configuration} from 'webpack'
import merge from 'webpack-merge'
import webpackConfig from './build/webpack.base.config'

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const outputPath = process.env.DIST || 'dist'
const config: Configuration = {
  mode,
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: join(process.cwd(), outputPath),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', 'ts', '.vue', '.json', 'stylus'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
    }),
  ],
}

export default merge(webpackConfig, config)
