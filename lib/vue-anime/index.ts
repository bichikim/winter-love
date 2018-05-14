import {PluginObject, VueConstructor} from 'vue'
import Anime from 'Anime.vue'

interface IOptions {
  name?: string
}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-anime] already installed Vue.use(~) should be called only once'
        )
      }
    }
    _vue = vue
    const {name = 'anime'} = options
    vue.mixin({
      components: {
        [name]: Anime,
      },
    })
  },
}

export default plugin
