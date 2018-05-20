import {PluginObject, VueConstructor} from 'vue'

interface IOptions {
  requireName?: string
  assetsName?: string
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
    const {requireName = 'require', assetsName = 'assets'} = options
    vue.mixin({
      created() {
        if(typeof this[requireName] === 'function'){
          const assets = this.require()
          if(this[`$${assetsName}`]){
            this[`$${assetsName}`] = {}
          }
          Object.assign(this[`$${assetsName}`], assets)
        }
      },
    })
  },
}
Object.freeze(plugin)
export default plugin
