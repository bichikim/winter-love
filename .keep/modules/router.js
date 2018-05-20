const {resolve} = require('path')
const {exists} = require('fs')
module.exports = async function router() {
  const {routerPath = 'router'} = this.options
  const myRouterPath = resolve(this.options.srcDir, routerPath, 'index.js')
  if(!await exists(myRouterPath)){
    if(this.options.dev){
      console.log('[router] Skipping path router disables')
    }
    return
  }
  // Disable parsing `pages/`
  this.nuxt.options.build.createRoutes = () => {
    return []
  }
  this.addTemplate({
    fileName: 'router.js',
    src: myRouterPath,
  })
}
