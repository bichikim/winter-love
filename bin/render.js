const {Nuxt, Builder} = require('nuxt-edge')
const nuxtConfig = require('../project/nuxt.config')

/**
 * Express middleware
 * @param options {object|null}
 * @param options.config {object}
 * @param options.build {boolean}
 * @return {Promise<any>}
 */
const render = (options = {}) => {
  const {build = false, config = {}} = options
  const nuxt = new Nuxt({...nuxtConfig, ... config})
  if(build){
    return  new Promise((resolve, reject) => {
      new Builder(nuxt).build().then((...anyResults) => {
        resolve(nuxt.render, ...anyResults)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  return Promise.resolve(nuxt.render)
}

module.exports = render
