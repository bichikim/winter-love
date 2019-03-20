import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import {join, resolve} from 'path'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'
import VueAutoRoutingPlugin from 'vue-auto-routing/lib/webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import webpack from 'webpack'

const config = (options: any = {}) => {
  const {
    transpileOnly = false,
    env = 'production',
    middlewarePath = 'middleware',
    layoutsPath = 'layouts',
    pagePath = 'pages',
    srcAlias = '@',
    routerMode = 'history',
    tsconfigPath = 'tsconfig.json',
    src = 'src',
  } = options
  const config = {
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx', '.vue', '.stylus', 'styl'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        [srcAlias]: resolve('./', src),
        '~': resolve('./', src),
      },
      // plugins: [
      //   new TsconfigPathsWebpackPlugin({
      //     configFile: resolve('./', tsconfigPath),
      //     baseUrl: resolve('./'),
      //   }),
      // ],
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
              use: ['pug-loader'],
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
      new webpack.DefinePlugin({
        'process.env.LAYOUTS_PATH': JSON.stringify(layoutsPath),
        'process.env.MIDDLEWARE_PATH': JSON.stringify(middlewarePath),
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.ROUTER_MODE': JSON.stringify(routerMode),
        'process.env.SRC_ALIAS': JSON.stringify(srcAlias),
      }),
      new VueAutoRoutingPlugin({
        pages: join(src, pagePath),
        importPrefix: `${srcAlias}/${pagePath}/`,
      }),
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

export default config
