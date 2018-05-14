import {PluginObject, VueConstructor} from 'vue'
import WhiteSpace from './WhiteSpace.vue'
export {WhiteSpace}

interface IOptions {
  name?: string
}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-lottie] already installed Vue.use(~) should be called only once'
        )
      }
      return
    }
    _vue = vue
    const {name = 'white-space'} = options
    vue.mixin({
      components: {
        [name]: WhiteSpace,
      },
    })
  },
}

export default plugin
