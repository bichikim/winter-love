module.exports = function noTestPage(options = {}) {
  const {name = 'test'} = options
  const dev = this.options.dev
  if(dev){return}
  // remove test route

}
