import Quasar from 'quasar'
import Vue from 'vue'
import Meta from 'vue-meta'
import VueRouter from 'vue-router'
import middleware from './utils/middleware'
interface Options {
  middlewarePath?: string
}

const register = (options: Options = {}) => {
  const {
    middlewarePath = './middleware',
  } = options
  Vue.use(Meta)
  Vue.use(Quasar)
  Vue.use(VueRouter)

  const router = new VueRouter({

  })
  middleware(middlewarePath, router)

  return {
    router,
  }
}

if(process.env.AUTO_REGISTER){
  register()
}

export default register
