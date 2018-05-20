import {PluginObject, VueConstructor} from 'vue'
import {shouldChange, boolean} from './helpers'
export {
  shouldChange,
  boolean,
}

interface IOptions {
  names?: {
    shouldChange?: string //'shouldChange'
    boolean?: string // 'boolean'
  }
}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-plugin] already installed Vue.use(~) should be called only once',
        )
      }
    }
    _vue = vue
    const {names: {
      shouldChange = 'shouldChange',
      boolean = 'boolean',
    } = {}} = options
    vue.prototype[shouldChange] = shouldChange
    vue.prototype[boolean] = boolean
  },
}
Object.freeze(plugin)
export default plugin
