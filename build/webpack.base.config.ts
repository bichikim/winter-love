import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import {Configuration} from 'webpack'
interface IOptions {
  mode?: 'production' | 'development'
}
const config = (options: IOptions = {}): Configuration => {
  const {
    mode = 'production',
  } = options
  const config: Configuration = {
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
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@vue/babel-preset-app'],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly: mode === 'development',
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
  if(mode === 'development'){
    if(!config.plugins){
      config.plugins = []
    }
    config.plugins.push(new ForkTsCheckerWebpackPlugin())
  }
  return config
}

export default config
