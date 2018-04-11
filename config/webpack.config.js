// this is for test & webStorm

/**
 *
 * @author Bichi Kim <bichi@live.co.kr> <bichi@pjfactory.com>
 */
const {join} = require('path')
const webpack = require('webpack')
const project = (...dir) => {
  return join(__dirname, '../../', ...dir)
}

const babel = {
  'presets': [[
    'env', {
      'targets': {
        'browser': [
          '> 1%',
          'last 2 versions',
          'not ie <= 8',
        ],
      },
    },
  ], 'stage-1', 'stage-2', 'stage-3'],
}
module.exports = {
  resolve: {
    extensions: ['.js', '.ts', 'vue'],
    modules: ['node_modules'],
    alias: {
      '@': project('src'), // for webStorm editor
      '@@': project('./'),
      '~': project('lib'),
      '~~': project('./'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babel,
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$|\.ts$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {esModules: true},
        },
        enforce: 'post',
        exclude: /node_modules|\.spec\.js$/,
      },
    ],
  },
  devtool: '#inline-source-map', //  'source-map', //'#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      'process.test': true,
    }),
  ],
  node: {
    global: true,
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false,
    fs: 'empty',
  },
}
