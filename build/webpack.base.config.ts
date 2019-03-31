import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {join, resolve} from 'path'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'
import VueAutoRoutingPlugin from 'vue-auto-routing/lib/webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import webpack from 'webpack'
// import {defineProcessEnv} from './utils/define-process-env'
export interface Environment {
  typescript?: {
    bundleProject?: string,
  },
  path?: {
    middleware?: string,
    layouts?: string
    pages?: string,
    src?: string,
  },
  styleguidist?: {
    script: string
    styleguideDir: string,
    components: string[],
    serverHost: string,
    require: string[],
  },
  env?: Project.ENV,
}

export interface Options {
  transpileOnly: boolean,
  env: 'production' | 'development',
  srcAlias: string | '@' | '~',
}

delete process.env.TS_NODE_PROJECT
const config = (options: any = {}, environment: Environment = {}) => {
  const {
    typescript: {
      bundleProject = 'tsconfig.bundle.json',
    } = {},
    path: {
      middleware = 'middleware',
      layouts = 'layouts',
      pages = 'pages',
      src = 'src',
    } = {},
    env: envData = {} as any,
  } = environment
  const {
    transpileOnly = false,
    env = 'production',
    srcAlias = '@',
    routerMode = 'history',
  } = options
  const config = {
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx', '.vue', '.stylus', 'styl'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        [srcAlias]: resolve('./', src),
        '~': resolve('./', src),
      },
      plugins: [
        new TsconfigPathsWebpackPlugin({
          configFile: bundleProject,
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
                configFile: bundleProject,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        // src/router.ts
        'process.env.LAYOUTS_PATH': JSON.stringify(layouts),
        // src/middleware
        'process.env.MIDDLEWARE_PATH': JSON.stringify(middleware),
        'process.env.NODE_ENV': JSON.stringify(env),
        // src/router.ts
        'process.env.ROUTER_MODE': JSON.stringify(routerMode),
        // src/middleware
        'process.env.SRC_ALIAS': JSON.stringify(srcAlias),
        'process.env.ENV': JSON.stringify(envData),
      }),
      new VueAutoRoutingPlugin({
        pages: join(src, pages),
        importPrefix: `${srcAlias}/${pages}/`,
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
