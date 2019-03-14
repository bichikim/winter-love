const HtmlWebpackPlugin = require('html-webpack-plugin')
const {join} = require('path')

const merge = require('webpack-merge')
const webpackConfig = require('./build/webpack.base.config')
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const outputPath = process.env.DIST || 'dist'
const config = {
  mode,
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: join(process.cwd(), outputPath),
    filename: '[name].bundle.js',
  },
  // resolve: {
  //   extensions: ['.js', '.ts', '.vue', '.json', 'stylus'],
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js',
  //   },
  // },
  plugins: [

    new HtmlWebpackPlugin({
      template: './src/index.pug',
    }),
  ],
}

module.exports = merge(webpackConfig({transpileOnly: mode === 'production'}), config)
