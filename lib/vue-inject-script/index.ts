import {PluginObject, VueConstructor} from 'vue'
import load from './load'
import IOptions from './IOptions'
import scriptComponentFactory from './script-component-factory'

let installed: boolean = false

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    const {
      src,
      loaded,
      prototypeName = 'cdnScript',
      name = 'inject-script',
      isRunScriptWithSrc = true,
    } = options
    if(installed){return}
    installed = true
    vue.prototype[`$${prototypeName}`] = load
    vue.component(
      name,
      scriptComponentFactory({
        name,
        prototypeName,
        isRunScriptWithSrc,
      })
    )
    // supporting Nuxt
    if(process.server){return}
    const done = (src) => () => {
      if(loaded){
        loaded(src)
      }
    }
    if(Array.isArray(src)){
      src.forEach((src: string) => {
        load(src).then(done(src))
      })
    }else if(typeof src === 'string'){
      load(src).then(done(src))
    }
  },
}

export default plugin
