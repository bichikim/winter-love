import {PluginObject, VueConstructor} from 'vue'

interface IOptions {
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
  },
}
Object.freeze(plugin)
export default plugin
