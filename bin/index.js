const {Nuxt, Builder} = require('nuxt')
const nuxtConfig = require('../config/nuxt.config')

/**
 * Defront Express middleware
 * @param options {object|null}
 * @param options.config {object}
 * @param options.build {boolean}
 * @return {Promise<any>}
 */
const defront = (options = {}) => {
  const {build = false, config = {}} = options
  const nuxt = new Nuxt({...nuxtConfig, ... config})
  let builder
  if(build){
    builder = new Builder(nuxt)
  }else{
    return nuxt.render
  }
  // only return Promise after building
  return new Promise((resolve, reject) => {
    if(builder){
      builder.build().then((...anyResults) => {
        resolve(nuxt.render, ...anyResults)
      }).catch((error) => {
        reject(error)
      })
    }else{
      try{
        resolve(nuxt.render)
      }catch(error){
        reject(error)
      }
    }
  })
}

module.exports = defront
