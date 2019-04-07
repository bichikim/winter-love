import Vue from 'vue'
import routes from 'vue-auto-routing'
import VueMeta from 'vue-meta'
import VueRouter from 'vue-router'
import {createRouterLayout} from 'vue-router-layout'
Vue.use(VueRouter)
Vue.use(VueMeta)

export default () => {
  const routerLayout = createRouterLayout((layout) => {
    return import(`./${process.env.LAYOUTS_PATH}/${layout}.vue`)
  })

  return new VueRouter({
    mode: (process.env.ROUTER_MODE || 'history') as any,
    routes: [
      {
        path: '/',
        component: routerLayout,
        children: routes,
      },
    ],
  })
}
