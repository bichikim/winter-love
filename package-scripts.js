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
    serve: 'node bin',
    deploy: 'gcloud app deploy',
    generate: nuxt('generate'),
    test: {
      default: 'karma start config/karma.config.js --browsers=PhantomJS --single-run',
    },
    eslint: {
      default: 'eslint --ext .js,.vue,.ts --ignore-path .gitignore .',
      fix: 'eslint --fix --ext .js,.vue,.ts --ignore-path .gitignore .',
    },
    tslint: {
      default: 'tslint --project tsconfig.json src/**/*.ts',
      fix: 'tslint --fix "src/**/*.ts"',
    },
    analyze: nuxt('build --analyze'),
    precommit: series(
      nps('tslint'),
      nps('eslint.fix'),
    ),
    'test:unit': 'karma start config/karma.config.js',
  },
}
