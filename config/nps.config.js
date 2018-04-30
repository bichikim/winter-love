const {series} = require('nps-utils')
const nps = (name) => {
  return `nps -c ./config/nps.config.js ${name}`
}
module.exports = {
  scripts: {
    default: nps('dev'),
    dev: 'nuxt -c config/nuxt.config.js',
    build: 'nuxt build -c config/nuxt.config.js',
    start: 'nuxt start -c config/nuxt.config.js',
    generate: 'nuxt generate -c config/nuxt.config.js',
    eslint: 'eslint --ext .js,.vue,.ts --ignore-path .gitignore .',
    tslint: 'tslint --project tsconfig.json src/**/*.ts',
    precommit: series(
      nps('tslint'),
      nps('eslint'),
    ),
  },
}
