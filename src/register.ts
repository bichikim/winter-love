import Quasar from 'quasar'
import Vue from 'vue'
import Meta from 'vue-meta'
import VueRouter from 'vue-router'

const register = () => {
  Vue.use(Meta)
  Vue.use(Quasar)
  Vue.use(VueRouter)

  const router = new VueRouter({

  })

  return {
    router,
  }
}

if(process.env.AUTO_REGISTER){
  register()
}

export default register
