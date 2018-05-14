import {PluginObject, VueConstructor} from 'vue'
import directive from './directive'

export interface IOptions {
  name?: string
  itemSelector?: string
  columnWidth?: string
  horizontalOrder?: boolean
  percentPosition?: boolean
  stamp?: string
  originLeft?: boolean
  originTop?: boolean
  containerStyle?: null
  transitionDuration?: number
  resize?: boolean
  initLayout?: boolean
}

let _vue: VueConstructor

const plugin: PluginObject<IOptions> = {
  install(vue: VueConstructor, options: IOptions = {}) {
    if(_vue && _vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-plugin] already installed Vue.use(~) should be called only once'
        )
      }
    }
    _vue = vue
    const {name = 'massonry', ...others} = options
    vue.directive(name, directive(others))
  },
}

export default plugin
