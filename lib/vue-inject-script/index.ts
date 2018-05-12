import {PluginObject, VueConstructor} from 'vue'
interface IOptions {
  prototypeName?: string
  name?: string
  src?: string | string[]
  isRunScriptWithSrc?: boolean
  loaded?: (src: string) => void
}

let installed: boolean = false
const appendElement = (element: HTMLScriptElement) => {
  document.querySelector('body').appendChild(element)
}

export const getAllScript = (): NodeListOf<HTMLScriptElement> => {
  return document.querySelectorAll('script')
}

export const findAttribute = (
  name: string,
  value: string,
  nodeList?: NodeListOf<HTMLElement>,
): Element | undefined => {
  if(!nodeList){return}
  const {length} = nodeList
  if(!nodeList.item) return
  for(let i = 0; i < length; i += 1){
    const node = nodeList.item(i)
    if(node.getAttribute && node.getAttribute(name) === value){
      return node
    }
  }
}

const load = (src: string, type: string = 'text/javascript'): Promise<string> => {
  if(findAttribute('script', src, getAllScript())){
    return Promise.resolve(src)
  }
  const script = document.createElement('script')
  script.type = type
  script.src = src
  appendElement(script)
  return new Promise<string>((resolve, reject) => {
    script.onload = () => {
      resolve(src)
    }
    script.onerror = (error) => {
      reject(error)
    }
  })
}

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
      props: ['src'],
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
        this[`$${prototypeName}`](this.src).then((src) => {
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
