module.exports = function noTestPage(options = {}) {
  const dev = this.options.dev
  if(dev){return}
  // remove test route
  this.extendRoutes((routes) => {
    [...routes].forEach((value, key) => {
      if(/^\/test\//.test(value.path)){
        routes.splice(key, 1)
      }
    })

  })
}
