import Router from 'vue-router'
const getter = (resources: __WebpackModuleApi.RequireContext) => {
  const keys = resources.keys()
  const modules = keys.map((key: string) => {
    return {
      module: resources(key),
      path: key,
    }
  })
}
export default (path: string, router: Router) => {
  // empty
}
