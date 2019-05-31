import middleware from '@/plugins/middleware'
import {Context} from '@/types/project'
import Vue, {ComponentOptions} from 'vue'
import App from './App.vue'
import plugin from './plugin'
import routerFactory from './router'
import storeFactory, {State} from './store'
import './vue-ts'
// test

interface ExContext {
  // empty
}

const env: Project.ENV = process.env.ENV

const app: ComponentOptions<Vue> = {
  render: (h) => (h(App)),
  env,
}

const store = storeFactory<Vue>(app)
const router = routerFactory<Vue>(app)
const context: Context<ExContext, State> = {app, store, router}

plugin(context, [
]).then(() => {
  middleware<ExContext, State>(context, {
    always: ['any'],
  })
  const vue = new Vue(app)
  window.__vue = vue
  vue.$mount('#app')
})
