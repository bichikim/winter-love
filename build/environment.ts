import dotenv from 'dotenv'

export default (path?: string) => {
  const env = dotenv.config({path}).parsed || {}
  const {
    TYPESCRIPT_BUNDLE_PROJECT,
    PATH_MIDDLEWARE,
    PATH_LAYOUTS,
    PATH_PAGES,
    PATH_SRC,
    PATH_PLUGINS,
    STYLEGUIDIST_SCRIPT,
    STYLEGUIDIST_STYLEGUIDE_DIR,
    STYLEGUIDIST_COMPONENTS,
    STYLEGUIDIST_SERVER_HOST,
    STYLEGUIDIST_REQUIRE,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
  } = env
  const environment: Project.Environment = {
    typescript: {
      bundleProject: TYPESCRIPT_BUNDLE_PROJECT,
    },
    path: {
      middleware: PATH_MIDDLEWARE,
      layouts: PATH_LAYOUTS,
      pages: PATH_PAGES,
      src: PATH_SRC,
      plugins: PATH_PLUGINS,
    },
    styleguidist: {
      script: STYLEGUIDIST_SCRIPT,
      styleguideDir: STYLEGUIDIST_STYLEGUIDE_DIR,
      components: STYLEGUIDIST_COMPONENTS,
      serverHost: STYLEGUIDIST_SERVER_HOST,
      require: STYLEGUIDIST_REQUIRE,
    },
    firebase: {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    },
  }
  return environment
}
