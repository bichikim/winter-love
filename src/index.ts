import {Context} from '@/lib/type'
// import firebase from '@/plugins/firebase'
import middleware from '@/plugins/middleware'
import Vue, {ComponentOptions} from 'vue'
import App from './App.vue'
import plugin from './plugin'
import routerFactory from './router'
import storeFactory, {State} from './store'

const env: Project.ENV = process.env.ENV

const app: ComponentOptions<Vue> = {
  render: (h) => (h(App)),
  env,
}

// firebase<Vue>(app, env.firebase)
const store = storeFactory<Vue>(app)
const router = routerFactory<Vue>(app)

const context: Context<Vue, State> = {
  app,
  store,
  router,
}

plugin(context, [
  {
    path: 'element',
  },
  {
    path: 'touch',
    options: {
      longPress: {
        default: {},
        varyLong: {
          timeInterval: 1000,
        },
      },
    },
  },
]).then(() => {
  middleware<Vue, any>(context, {
    always: ['any'],
  })
  const vue = new Vue(app)
  window.__vue = vue
  vue.$mount('#app')
})
