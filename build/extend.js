module.default = (config, {isDev, isClient}) => {
  /*************************************************
   * Run ESLint on save
   *************************************************/
  if(isDev && isClient && isEsLint(config)){
    config.module.rules.push({
      enforce: 'pre',
      test: /\.(js|ts|vue)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules)/,
    })
  }
  /*************************************************
   * Change alias "~" location from ./${srcDir} to ./lib
   *************************************************/
  config.resolve.alias['~'] = path.resolve(config.resolve.alias['@@'], 'lib')
}
