const {resolve} = require('path')
const createLanguageRouts = (routes, languages) => {
  const localRoutes = []
  routes.forEach((route) => {
    localRoutes.push(route)
    languages.forEach((language) => {
      const locale = language.locale
      localRoutes.push({
        ...route,
        name: `${locale}___${route.name}`,
        path: `/${locale}${route.path}`,
      })
    })
  })
  return localRoutes
}

// ---> link to plugins/vue-i18n.ts
module.exports = function i18n(options) {
  const {defaultLocale = 'en', languages = [], prefixLocalePath = true} = options

  if(prefixLocalePath){
    // extend Routes for the prefixLocalePath option
    this.extendRoutes((routes) => {
      // create Language Routs
      const localRoutes = createLanguageRouts(routes, languages)
      // remove all routes made by Nuxt
      routes.splice(0, routes.length)
      // add Language Routs
      routes.unshift(...localRoutes)
    })
  }

  // add vue-i18n.ts as a template
  this.addPlugin({
    src: resolve(__dirname, '../plugins/vue-i18n.ts'),
    fileName: 'plugins/vue-i18n.ts',
    options: {defaultLocale},
  })
}
