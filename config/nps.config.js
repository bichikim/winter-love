const {series} = require('nps-utils')
const nps = (name) => {
  return `nps -c ./config/nps.config.js ${name}`
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
    eslint: 'eslint --ext .js,.vue,.ts --ignore-path .gitignore .',
    tslint: 'tslint --project tsconfig.json src/**/*.ts',
    precommit: series(
      nps('tslint'),
      nps('eslint'),
    ),
    'test:unit': 'karma start config/karma.config.js',
  },
}
