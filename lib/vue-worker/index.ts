import {PluginObject, VueConstructor} from 'vue'

interface IOptions {
}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-worker] already installed Vue.use(~) should be called only once'
        )
      }
    }
    _vue = vue
  },
}

export default plugin
