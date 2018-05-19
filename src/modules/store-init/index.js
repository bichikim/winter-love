const {resolve} = require('path')
module.exports = function options() {
  const {store} = this.options
  if(!store){
    if(this.options.dev){
      console.log('[options] skipping load winter options')
    }
    return
  }
  this.addPlugin(resolve(__dirname, 'vuex-init.ts'))
  const myStore = {...store, isDoneInit: true}
  if(!this.options.env){
    this.options.env = {}
  }
  Object.assign(this.options.env, {store: myStore})
}
