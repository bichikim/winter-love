import Router, {NavigationGuard, Route} from 'vue-router'
type BeforeEachFn = NavigationGuard
type BeforeResolveFn = NavigationGuard
type AfterEachFn = (to: Route, from: Route) => any
interface MiddlewareList {
  beforeEach: BeforeEachFn[]
  beforeResolve: BeforeResolveFn[]
  afterEach: AfterEachFn[]
}
const getter = (resources: __WebpackModuleApi.RequireContext): MiddlewareList => {
  const keys = resources.keys()
  const modules = keys.map(resources)
  const beforeEachList: BeforeEachFn[] = []
  const beforeResolveList: BeforeResolveFn[] = []
  const afterEachList: AfterEachFn[] = []
  modules.forEach((module: any) => {
    if(!module){
      return
    }
    const {
      beforeEach,
      beforeResolve,
      afterEach,
    } = module
    if(beforeEach){
      beforeEachList.push(beforeEach)
    }
    if(beforeResolve){
      beforeResolveList.push(beforeResolve)
    }
    if(afterEach){
      afterEachList.push(afterEach)
    }
  })
  return {
    beforeEach: beforeEachList,
    beforeResolve: beforeResolveList,
    afterEach: afterEachList,
  }
}
export default (router: Router) => {
  const middlewareList: MiddlewareList = getter(require.context(
    `../${process.env.MIDDLEWARE_PATH}/`,
    false,
    /\.ts$/,
    ))
  middlewareList.beforeEach.forEach((beforeEach: BeforeEachFn) => {
    router.beforeEach(beforeEach)
  })
  middlewareList.beforeResolve.forEach((beforeResolve: BeforeResolveFn) => {
    router.beforeResolve(beforeResolve)
  })
  middlewareList.afterEach.forEach((afterEach: AfterEachFn) => {
    router.afterEach(afterEach)
  })
}
