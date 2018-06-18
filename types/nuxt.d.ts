import {Route} from 'vue-router'
declare interface INuxtContext {
  app: any
  store: any
  route: Route
  params: any
  query: any
  req: any
  res: any
  redirect: any
  error: (params: any) => void
  nuxtState: any
  beforeNuxtRender: (params: any) => void
}
