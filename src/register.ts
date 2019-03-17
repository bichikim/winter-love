import Quasar from 'quasar'
import Vue from 'vue'
import routes from 'vue-auto-routing'
import Meta from 'vue-meta'
import VueRouter from 'vue-router'
import Vuex, {Store} from 'vuex'
import storeData from './store'
import middleware from './utils/middleware'

const register = () => {
  Vue.use(Meta)
  Vue.use(Quasar)
  Vue.use(VueRouter)
  Vue.use(Vuex)

  const router = new VueRouter({
    routes,
  })

  const store = new Store(storeData)

  middleware<any, any>(router, store, {
    app: {},
  })

  return {
    router,
    store,
  }
}

if(process.env.AUTO_REGISTER){
  register()
}

export default register
