import {PluginObject, VueConstructor} from 'vue'
import Three from './Three.vue'

interface IOptions {
  name?: string
}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-three] already installed Vue.use(~) should be called only once'
        )
      }
    }
    _vue = vue
    const {name = 'three'} = options
    vue.mixin({
      components: {
        [name]: Three,
      },
    })
  },

}

export default plugin
