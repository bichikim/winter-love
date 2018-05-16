import addOptions from '../add-options'
import decoratorFactory from '../decorator-factory'
import {VueClass} from '../types'
export default decoratorFactory(function Prop(target: VueClass, key: string, options?: any) {
  addOptions(target, key, options)
})
