import {PluginObject, VueConstructor} from 'vue'
import load from './load'
import IOptions from './IOptions'

let installed: boolean = false

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    const {
      src,
      loaded,
      prototypeName = 'cdnScript',
      name = 'inject-script',
      isRunScriptWithSrc = true,
    } = options
    if(installed){return}
    installed = true
    const style = ['display:none']
    vue.prototype[`$${prototypeName}`] = load
    vue.component(name, {
      name,
      props: ['src', 'type'],
      data() {
        return {loaded: false}
      },
      created() {
        // supporting Nuxt
        if(process.server){return}
        if(!this.src){
          this.loaded = true
          return
        }
        this[`$${prototypeName}`](this.src, this.type).then((src) => {
          this.loaded = true
          this.$emit(`${name}/loaded`, src)
        }).catch((error) => {
          this.$emit(`${name}/error`, error)
        })
      },
      render(h) {
        if((this.src && !isRunScriptWithSrc) || !this.loaded){
          return h('div', {style})
        }
        return h('div', {style}, [h('script', [this.$slots.default])])
      },
    })
    // supporting Nuxt
    if(process.server){return}
    const done = (src) => () => {
      if(loaded){
        loaded(src)
      }
    }
    if(Array.isArray(src)){
      src.forEach((src: string) => {
        load(src).then(done(src))
      })
    }else if(typeof src === 'string'){
      load(src).then(done(src))
    }
  },
}

export default plugin
