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
          '[vue-plugin] already installed Vue.use(~) should be called only once',
        )
      }
    }
    _vue = vue
    const {name = 'namespacedEvent'} = options
    vue.prototype[`$${name}`] = function(event) {
      return `${name}/${event}`
    }
  },
}
Object.freeze(plugin)
export default plugin
