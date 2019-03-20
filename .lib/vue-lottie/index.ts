import {PluginObject, VueConstructor} from 'vue'
import * as events from './events'
import Lottie from './Lottie'
export {Lottie}
export {events}

let _vue: VueConstructor

interface IOptions {
  name?: string
}

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-lottie] already installed Vue.use(~) should be called only once',
        )
      }
      return
    }
    _vue = vue
    const {name = 'lottie'} = options
    vue.mixin({
      components: {
        [name]: Lottie,
      },
    })
  },
}

export default plugin
