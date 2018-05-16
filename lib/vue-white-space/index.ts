import {PluginObject, VueConstructor} from 'vue'
import WhiteSpace from './WhiteSpace.vue'
export {WhiteSpace}

interface IOptions {
  name?: string
}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    const {name = 'white-space'} = options
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          `[vue-${name}] already installed Vue.use(~) should be called only once`,
        )
      }
      return
    }
    _vue = vue
    vue.mixin({
      components: {
        [name]: WhiteSpace,
      },
    })
  },
}
Object.freeze(plugin)
export default plugin
