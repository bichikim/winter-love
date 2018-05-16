import {isFunction, isString} from 'lodash'
import {TDecoratorFactoryRunner} from './types'
export default function decoratorFactory(runner: TDecoratorFactoryRunner): any {
  return function(option: any, _key?: any, ...others: any []) {
    let myOptions: any
    // tslint:disable-next-line
    const setDecorator = function(target: any, key: string | symbol) {
      return runner.call(this, target, key, ...myOptions)
    }
    if(!isString(option) && !isFunction(option)){
      myOptions = others
      return setDecorator(option, _key)
    }
    myOptions = [option, _key, ...others]
    return setDecorator
  }
}
