import {PluginObject, VueConstructor} from 'vue'

interface IOptions {
  prototypeName?: string
  prefix?: string
}

function namespacedName(event: string, prefix?: string) {
  const name = `${this.$options.eventName || this.name}/${event}`
  if(prefix){
    return `${prefix}/${name}`
  }
  return name
}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-namespace-event] already installed Vue.use(~) should be called only once'
        )
      }
      return
    }
    _vue = vue
    const {prototypeName = 'np', prefix} = options
    vue.prototype[`$${prototypeName}`] = {
      emit(event: string, ...args: any[]) {
        this.$emit(namespacedName.call(this, event, prefix), ...args)
      },
      on(event: string, callback: (...args: any[]) => any) {
        this.$on(namespacedName.call(this, event, prefix), callback)
      },
      ones(event: string, callback: (...args: any[]) => any) {
        this.$ones(namespacedName.call(this, event, prefix), callback)
      },
    }
  },
}

export default plugin
