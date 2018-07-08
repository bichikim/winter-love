const {series} = require('nps-utils')
const nps = (name) => {
  return `nps ${name}`
}
const nuxt = (name = '') => {
  return `node project ${name}`
}
module.exports = {
  scripts: {
    default: nps('dev'),
    dev: nuxt(),
    build: {
      default: nuxt('build'),
    },
    start: nuxt('start'),
    serve: {
      default: 'cross-env NODE_ENV=production node bin',
      electron: 'cross-env NODE_ENV=development electron bin/electron',
    },
    deploy: 'gcloud app deploy',
    generate: nuxt('generate'),
    test: {
      default: 'jest test',
    },
    doc: {
      default: '',
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
