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
    const {name = 'assets'} = options
    vue.mixin({
      created() {
        if(typeof this[name] === 'function'){
          const assets = this[name]()
          if(!this[`$${name}`]){
            this[`$${name}`] = {}
          }
          Object.assign(this[`$${name}`], assets)
        }
      },
    })
  },
}
Object.freeze(plugin)
export default plugin
