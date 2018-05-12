import {PluginObject, VueConstructor} from 'vue'

interface IOptions {
}

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
  },
}

export default plugin
