const {series} = require('nps-utils')
const nps = (name) => {
  return `nps ${name}`
}
const nuxt = (name = '') => {
  return `nuxt ${name} -c config/nuxt.config.js`
}
module.exports = {
  scripts: {
    default: nps('dev'),
    dev: nuxt(),
    build: nuxt('build'),
    start: nuxt('start'),
    generate: nuxt('generate'),
    eslint: {
      default: 'eslint --ext .js,.vue,.ts --ignore-path .gitignore .',
      fix: 'eslint --fix .js,.vue,.ts --ignore-path .gitignore .',
    },
    tslint: 'tslint --project tsconfig.json src/**/*.ts',
    precommit: series(
      nps('tslint'),
      nps('eslint'),
    ),
    'test:unit': 'karma start config/karma.config.js',
  },
}
