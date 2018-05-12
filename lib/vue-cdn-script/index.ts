import {PluginObject, VueConstructor} from 'vue'
interface IOptions {
  prototypeName?: string
  src?: string | string[]
  loaded?: (src: string) => void
}

let installed: boolean = false
const addHtmlHead = (element: HTMLScriptElement) => {
  document.querySelector('head').appendChild(element)
}

const getAllScript = (): NodeListOf<HTMLScriptElement> => {
  return document.querySelectorAll('head script')
}

const findAttribute = (
  nodeList: NodeListOf<Element>,
  name: string,
  value: string,
): Element | undefined => {
  const {length} = nodeList
  for(let i = 0; i < length; i += 1){
    const node = nodeList.item(i)
    if(node.getAttribute(name) === value){
      return node
    }
  }
}

const load = (src: string, type: string = 'text/javascript'): Promise<string> => {
  if(findAttribute(getAllScript(), 'script', src)){
    return Promise.resolve(src)
  }
  const script = document.createElement('script')
  script.type = type
  script.src = src
  addHtmlHead(script)
  return new Promise<string>((resolve, reject) => {
    script.onload = () => {
      resolve(src)
    }
    script.onerror = (error) => {
      reject(error)
    }
  })
}

const vueCdnScript: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    const {src, loaded, prototypeName = 'cdnScript'} = options
    if(installed){return}
    installed = true
    if(Array.isArray(src)){
      src.forEach((src: string) => {
        load(src).then(() => {
          if(loaded){
            loaded(src)
          }
        })
      })
    }
    vue.prototype[`$${prototypeName}`] = load
    vue.component('cdn-script', {
      props: ['src'],
      created() {
        this.$script(this.src).then((src) => {
          this[`$${prototypeName}`]('cdn-script/loaded', src)
        }).catch((error) => {
          this.$emit('cdn-script/error', error)
        })
      },
      render(h) {
        return h('div', {style: ['display:none']}, this.$slots.default)
      },
    })
  },
}

export default vueCdnScript
