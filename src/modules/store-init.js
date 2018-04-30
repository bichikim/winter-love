const {resolve} = require('path')
module.exports = function options() {
  const {storeInit} = this.options
  if(!storeInit){
    if(this.options.dev){
      console.log('[options] skipping load winter options')
    }
    return
  }
  this.addPlugin(resolve(__dirname, 'vuex-init.ts'))
  const env = {...storeInit}
  if(!this.options.env){
    this.options.env = {}
  }
  Object.assign(this.options.env, env)
}
