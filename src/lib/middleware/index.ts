import Vue, {ComponentOptions} from 'vue'
import {Route} from 'vue-router'
import {Next} from 'vue-router/next'
import {Store} from 'vuex'
import {Context} from '../type'

export type RouterHook = (to: Route, from: Route, next?: Next) => any
export type RouterAfterHook = (to: Route, from: Route) => any
export interface AfterMiddlewareContext<V extends Vue, S> {
  to: Route
  from: Route
  next?: Next
  app: ComponentOptions<V>
  store?: Store<S>
}

export interface MiddlewareContext<V extends Vue, S>
  extends AfterMiddlewareContext<V, S> {
  next: Next
}

export type Middleware<V extends Vue, S> = (context: AfterMiddlewareContext<V, S>) => any
export interface MiddlewarePack<V extends Vue, S> {
  name: string
  middleware: Middleware<V, S>
}
export interface MiddlewarePackList<V extends Vue, S> {
  beforeEach: Array<MiddlewarePack<V, S>>
  beforeResolve: Array<MiddlewarePack<V, S>>
  afterEach: Array<MiddlewarePack<V, S>>
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

const createPack =
  <V extends Vue, S>(name: string, middleware: Middleware<V, S>): MiddlewarePack<V, S> => {
  return {
    name: getFileName(name),
    middleware,
  }
}

const getter = <V extends Vue, S>
(resources: __WebpackModuleApi.RequireContext): MiddlewarePackList<V, S> => {
  const afterEachList: Array<MiddlewarePack<V, S>> = []
  const beforeEachList: Array<MiddlewarePack<V, S>> = []
  const beforeResolveList: Array<MiddlewarePack<V, S>> = []
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

export interface Options {
  always?: string[]
}

const capsule = <V extends Vue, S>(
  name: string,
  middleware: Middleware<V, S>,
  store: Store<S>,
  app: ComponentOptions<V>,
  options: Options = {},
): RouterHook | RouterAfterHook => {
  const {
    always = [],
  } = options
  return (to: Route, from: Route, next?: Next) => {
    const runMiddleware = () => {
      const ctx: any = {to, from, store, app}
      if(next){
        ctx.next = next
      }
      return middleware(ctx)
    }
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
    // skip
    if(next){
      next()
    }
  }
}

export default <V extends Vue, S>(context: Context<V, S>, options: Options = {}) => {
  const {router, store, app} = context
  if(!router){
    return console.warn('[middleware] no router')
  }
  const middlewareList: MiddlewarePackList<V, S> = getter<V, S>(require.context(
    `${process.env.SRC_ALIAS}/${process.env.MIDDLEWARE_PATH}/`,
    false,
    /\.ts$/,
  ))
  middlewareList.beforeEach.forEach(({name, middleware}: MiddlewarePack<V, S>) => {
    router.beforeEach(capsule(name, middleware, store, app, options))
  })
  middlewareList.beforeResolve.forEach(({name, middleware}: MiddlewarePack<V, S>) => {
    router.beforeResolve(capsule(name, middleware, store, app, options))
  })
  middlewareList.afterEach.forEach(({name, middleware}: MiddlewarePack<V, S>) => {
    router.afterEach(capsule(name, middleware, store, app, options))
  })
}
