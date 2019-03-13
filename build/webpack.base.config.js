const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {resolve} = require('path')
const TsconfigPathsWebpackPlugin  = require('tsconfig-paths-webpack-plugin')
const VueLoaderPlugin  = require( 'vue-loader/lib/plugin')
// fix TsconfigPathsWebpackPlugin bug
// refer to https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/32
const config = (options = {}) => {
  const {
    transpileOnly = false,
  } = options
  const config = {
    resolve: {
      plugins: [
        new TsconfigPathsWebpackPlugin({
          configFile: resolve('./tsconfig.json'),
          baseUrl: resolve('./'),
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'stylus-loader',
          ],
        },
        {
          test: /\.pug$/,
          oneOf: [
            // this applies to `<template lang="pug">` in Vue components
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader'],
            },
            // this applies to pug imports inside JavaScript
            {
              use: ['raw-loader', 'pug-plain-loader'],
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@vue/babel-preset-app'],
                plugins: ['istanbul'],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
    ],
  }
  if(transpileOnly){
    if(!config.plugins){
      config.plugins = []
    }
    config.plugins.push(new ForkTsCheckerWebpackPlugin())
  }
  return config
}

module.exports = config
