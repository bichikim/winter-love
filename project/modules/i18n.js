const {resolve} = require('path')
const defaultMessage = require('../languages/default')
const decorateRouteName = (locale, routeName, routeNameDecorator = '___') => {
  if(typeof routeNameDecorator === 'string'){
    return `${locale}${routeNameDecorator}${routeName}`
  }
  if(typeof routeNameDecorator === 'function'){
    return routeNameDecorator(locale, routeName)
  }
  throw new Error('[project i18n] routeNameDecorator have to be string or function')
}

const createLanguageRouts = (routes, languages, routeNameDecorator, defaultLocale) => {
  const localRoutes = []
  // make sure the default routes exists
  if(typeof languages.find((value) => (value.locale === defaultLocale)) === 'undefined'){
    languages.push({locale: defaultLocale})
  }
  routes.forEach((route) => {
    localRoutes.push(route)
    languages.forEach((language) => {
      const locale = language.locale
      localRoutes.push({
        ...route,
        name: decorateRouteName(locale, route.name, routeNameDecorator),
        path: `/${locale}${route.path}`,
      })
    })
  })
  return localRoutes
}

// ---> link to plugins/vue-i18n.ts
module.exports = function i18n(options) {
  const {
    defaultLocale = 'en',
    languageRoutes = [],
    prefixLocalePath = true,
    routeNameDecorator = '___',
  } = options

  if(prefixLocalePath){
    // extend Routes for the prefixLocalePath option
    this.extendRoutes((routes) => {
      // create Language Routs
      const localRoutes = createLanguageRouts(
        routes,
        languageRoutes,
        routeNameDecorator,
        defaultLocale,
        )
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
    options: {defaultLocale, defaultMessage: JSON.stringify(defaultMessage)},
  })
}
