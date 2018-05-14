import {PluginObject, VueConstructor} from 'vue'
import load from './load'
import IOptions from './IOptions'
import scriptComponentFactory from './script-component-factory'

export {IOptions, load}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-inject-script] already installed Vue.use(~) should be called only once'
        )
      }
    }
    _vue = vue
    const {
      src,
      loaded,
      prototypeName = 'cdnScript',
      name = 'inject-script',
      isRunScriptWithSrc = true,
    } = options
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
