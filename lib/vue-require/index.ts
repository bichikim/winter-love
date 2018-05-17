import {PluginObject, VueConstructor} from 'vue'

interface IOptions {
  name?: string
}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-require] already installed Vue.use(~) should be called only once',
        )
      }
    }
    _vue = vue
    const {name = 'require'} = options
    vue.prototype[`$${name}`] = require
  },
}
Object.freeze(plugin)
export default plugin
