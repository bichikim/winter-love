import middleware from '@/plugins/middleware'
import {Context} from '@/types/project'
import Vue, {ComponentOptions} from 'vue'
import App from './App.vue'
import plugin from './plugin'
import './polyfills'
import routerFactory from './router'
import storeFactory, {State} from './store'
// test

interface ExContext {
  // empty
}

const env: Project.ENV = process.env.ENV
const firebaseOptions = process.env.FIREBASE

console.log('fire', firebaseOptions)

const app: ComponentOptions<Vue> = {
  render: (h) => (h(App)),
  env,
}

// firebase<Vue>(app, env.firebase)
const store = storeFactory<Vue>(app)
const router = routerFactory<Vue>(app)
const context: Context<ExContext, State> = {app, store, router}

plugin(context, [
  'element',
  {
    path: 'firebase',
    options: firebaseOptions,
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
  middleware<ExContext, State>(context, {
    always: ['any'],
  })
  const vue = new Vue(app)
  window.__vue = vue
  vue.$mount('#app')
})
