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
          '[vue-assets] already installed Vue.use(~) should be called only once'
        )
      }
      return
    }
    _vue = vue
    const {name = 'assets'} = options
    vue.mixin({
      created() {
        const {assets = {}} = this.$options
        this.$assets = {}
        Object.keys(assets).forEach((key) => {
          this[`$${name}`][key] = assets[key]
        })
      },
    })
  },
}

export default plugin
