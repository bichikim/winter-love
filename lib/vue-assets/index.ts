import {PluginObject, VueConstructor} from 'vue'

interface IOptions {
  name?: string
}

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
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
