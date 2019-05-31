import environment from '@@/build/environment'
import {resolve} from 'path'

describe('environments', function test() {
  it('should get all environment', function test() {
    const env = environment(resolve('test-build/mock/.env'))
    expect(env).to.deep.equal({
      typescript: {
        bundleProject: 'TYPESCRIPT_BUNDLE_PROJECT',
      },
      path: {
        middleware: 'PATH_MIDDLEWARE',
        layouts: 'PATH_LAYOUTS',
        pages: 'PATH_PAGES',
        src: 'PATH_SRC',
        plugins: 'PATH_PLUGINS',
      },
      styleguidist: {
        script: 'STYLEGUIDIST_SCRIPT',
        styleguideDir: 'STYLEGUIDIST_STYLEGUIDE_DIR',
        components: 'STYLEGUIDIST_COMPONENTS',
        serverHost: 'STYLEGUIDIST_SERVER_HOST',
        require: 'STYLEGUIDIST_REQUIRE',
      },
      firebase: {
        apiKey: 'FIREBASE_API_KEY',
        authDomain: 'FIREBASE_AUTH_DOMAIN',
        databaseURL: 'FIREBASE_DATABASE_URL',
        projectId: 'FIREBASE_PROJECT_ID',
        storageBucket: 'FIREBASE_STORAGE_BUCKET',
        messagingSenderId: 'FIREBASE_MESSAGING_SENDER_ID',
      },
    })
  })

  it('should get all environment empty', function test() {
    const env = environment(resolve('test-build/mock/.env-empty'))
    expect(env).to.deep.equal({
      typescript: {
        bundleProject: undefined,
      },
      path: {
        middleware: undefined,
        layouts: undefined,
        pages: undefined,
        src: undefined,
        plugins: undefined,
      },
      styleguidist: {
        script: undefined,
        styleguideDir: undefined,
        components: undefined,
        serverHost: undefined,
        require: undefined,
      },
      firebase: {
        apiKey: undefined,
        authDomain: undefined,
        databaseURL: undefined,
        projectId: undefined,
        storageBucket: undefined,
        messagingSenderId: undefined,
      },
    })
  })
})
