module.exports = function options() {
  const {storeInit} = this.options
  if(!storeInit){
    if(this.options.dev){
      console.log('[options] skipping load winter options')
    }
    return
  }
  const env = {...storeInit}
  if(!this.options.env){
    this.options.env = {}
  }
  Object.assign(this.options.env, env)
}
