import decoratorFactory from '../decorator-factory'
import {VueClass} from '../types'

export default decoratorFactory(function Prop(target: VueClass, key: string, options?: any) {
  console.log('class get', target, key, options)
})
