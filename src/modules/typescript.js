module.exports = function() {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push('ts')
  // Extend build
  this.extendBuild((config) => {
    const tsLoader = {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        // refer to https://github.com/nuxt/nuxt.js/issues/3164
        transpileOnly: true,
      },
      // refer to https://github.com/nuxt/nuxt.js/issues/3164
      exclude: [
        /vendor/,
        /\.nuxt/,
      ],
    }
    // Add TypeScript loader
    config.module.rules.push({
      test: /((client|server)\.js)|(\.tsx?)$/,
      ...tsLoader,
    })
    // Add TypeScript loader for vue files
    for(let rule of config.module.rules){
      if(rule.loader === 'vue-loader'){
        if(!rule.options.loaders){
          rule.options.loaders = {}
        }
        rule.options.loaders.ts = tsLoader
      }
    }
    // Add .ts extension in webpack resolve
    // eslint-disable-next-line no-magic-numbers
    if(config.resolve.extensions.indexOf('.ts') === -1){
      config.resolve.extensions.push('.ts')
    }
  })
}
