import Router, {Route} from 'vue-router'
import {Next} from 'vue-router/next'
import {Store} from 'vuex'
export type RouterHook = (to: Route, from: Route, next?: Next) => any
export type RouterAfterHook = (to: Route, from: Route) => any
export interface MiddlewareContext<S, A> {
  to: Route
  from: Route
  next?: Next
  app: A
  store?: Store<S>
}
export type Middleware<S, A> = (context: MiddlewareContext<S, A>) => any
export interface MiddlewarePack<S, A> {
  name: string
  middleware: Middleware<S, A>
}
export interface MiddlewarePackList<S, A> {
  beforeEach: Array<MiddlewarePack<S, A>>
  beforeResolve: Array<MiddlewarePack<S, A>>
  afterEach: Array<MiddlewarePack<S, A>>
}

export interface ModulePack {
  name: string
  module: any
}

const getFileName = (path: string): string => {
  const match = path.match(/\/.*\.ts$/)
  if(!match || match.length < 1){
    return path
  }
  return match[0].split('/')[1].split('.')[0]
}

const createPack = <S, A>(name: string, middleware: Middleware<S, A>): MiddlewarePack<S, A> => {
  return {
    name: getFileName(name),
    middleware,
  }
}

const getter = <S, A>(resources: __WebpackModuleApi.RequireContext): MiddlewarePackList<S, A> => {
  const afterEachList: Array<MiddlewarePack<S, A>> = []
  const beforeEachList: Array<MiddlewarePack<S, A>> = []
  const beforeResolveList: Array<MiddlewarePack<S, A>> = []
  const keys = resources.keys()
  const modules: ModulePack[] = keys.map((key) => ({
    name: key,
    module: resources(key),
  }))
  modules.forEach(({module, name}: ModulePack) => {
    if(!module){
      return
    }
    const {
      beforeEach,
      beforeResolve,
      afterEach,
    } = module
    if(beforeEach){
      beforeEachList.push(createPack(name, beforeEach))
    }
    if(beforeResolve){
      beforeResolveList.push(createPack(name, beforeResolve))
    }
    if(afterEach){
      afterEachList.push(createPack(name, afterEach))
    }
  })
  return {
    beforeEach: beforeEachList,
    beforeResolve: beforeResolveList,
    afterEach: afterEachList,
  }
}

export interface Options<A> {
  always?: string[]
  app?: A
}
export default <S, A = any>(router: Router, store: Store<S>, options: Options<A> = {}) => {
  const {
    always = [],
    app = {} as A,
  } = options
  const middlewareList: MiddlewarePackList<S, A> = getter<S, A>(require.context(
    `${process.env.SRC_ALIAS}/${process.env.MIDDLEWARE_PATH}/`,
    false,
    /\.ts$/,
    ))
  const capsule = (
    name: string,
    middleware: Middleware<S, A>,
  ): RouterHook | RouterAfterHook => {
    return (to: Route, from: Route, next?: Next) => {
      const runMiddleware = () => (middleware({to, from, next, store, app}))
      const alwaysSome = (requireName): boolean => (name === requireName)
      const recordSome = (record): boolean => {
        if(!record.meta || !record.meta.middleware){
          return false
        }
        const {middleware} = record.meta
        if(Array.isArray(middleware)){
          return middleware.some((mid: string) => (mid === name))
        }
        return middleware === name
      }
      if(always.some(alwaysSome)){
        return runMiddleware()
      }
      if(to.matched.some(recordSome)){
        return runMiddleware()
      }
      if(next){
        next()
      }
    }
  }
  middlewareList.beforeEach.forEach(({name, middleware}: MiddlewarePack<S, A>) => {
    router.beforeEach(capsule(name, middleware))
  })
  middlewareList.beforeResolve.forEach(({name, middleware}: MiddlewarePack<S, A>) => {
    router.beforeResolve(capsule(name, middleware))
  })
  middlewareList.afterEach.forEach(({name, middleware}: MiddlewarePack<S, A>) => {
    router.afterEach(capsule(name, middleware))
  })
}
