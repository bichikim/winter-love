const defaultArgv = [
  '-c', 'project/nuxt.config.js',
]
process.argv = process.argv.concat(defaultArgv)
require('nuxt-edge/bin/nuxt')
