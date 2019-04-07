import {DirectiveOptions, VueConstructor} from 'vue'
import {longPress, Options as LongPressOption} from './touch-long-press'
import {Options as SwipeOption, swipe} from './touch-swipe'

export const defaultName = 'default'

export interface Options {
  name?: string
  longPress?: LongPressOption | {[key: string]: LongPressOption}
  swipe?: SwipeOption | {[key: string]: SwipeOption}
}

interface Directives {
  longPress?: {[key: string]: DirectiveOptions}
}

type DirectiveFactory = (name: string, options: any) => DirectiveOptions

interface DirectiveFactories {
  longPress: DirectiveFactory
  swipe: DirectiveFactory
}

const directiveFactories: DirectiveFactories = {
  longPress,
  swipe,
}

const createDirectives = (
  directiveName: string,
  directiveFactories: DirectiveFactories,
  options: {[key: string]: any},
) => {
  const directives: {[key: string]: DirectiveOptions} = {}
  const directiveFactory = directiveFactories[directiveName]
  const directiveOptions = options[directiveName]
  if(typeof directiveOptions === 'object'){
    Object.keys(directiveOptions).forEach((name: string) => {
      directives[name] = directiveFactory(name, directiveOptions[name])
    })
  }else{
    directives[defaultName] = directiveFactory()
  }
  return directives
}

const callAll = (
  directives: Directives,
  kind: string,
  ...args: any[]) => {
  Object.keys(directives).forEach((directiveName: string) => {
    const directiveParts = directives[directiveName]
    Object.keys(directiveParts).forEach((name: string) => {
      const directive: DirectiveOptions = directiveParts[name]
      if(directive[kind]){
        directive[kind](...args)
      }
    })
  })
}

export const touch = (options: Options = {}) => {
  const directives: Directives = {}

  Object.keys(directiveFactories).forEach((directiveName: string) => {
    directives[directiveName] = createDirectives(directiveName, directiveFactories, options)
  })

  return {
    bind(...args: any[]) {
      callAll(directives, 'bind', ...args)
    },
    unbind(...args: any[]) {
      callAll(directives, 'unbind', ...args)
    },
    update(...args: any[]) {
      callAll(directives, 'update', ...args)
    },
    inserted(...args: any[]) {
      callAll(directives, 'inserted', ...args)
    },
    componentUpdated(...args: any[]) {
      callAll(directives, 'componentUpdated', ...args)
    },
  }
}

export default class Touch {
  static install(vue: VueConstructor, options: Options = {}) {
    const {name = 'eex'} = options
    vue.directive(name, touch(options))
  }
}
