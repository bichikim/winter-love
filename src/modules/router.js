const routerInfo = require('../router')
module.exports = function() {
  this.extendRoutes((routes, _resolve) => {
    const resolve = (path) => {
      return _resolve(__dirname, '../pages', path)
    }
    // disable all routes from nuxt
    routes.forEach(() => {
      routes.pop()
    })
    const myRoutes = routerInfo(resolve)
    myRoutes.forEach((value) => {
      routes.push(value)
    })
  })
}
