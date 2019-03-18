import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import middleware from './utils/middleware'

const vue = new Vue({
  render: (h) => (h(App)),
  router,
  store,
})

middleware<any, any>(router, store, {
  always: ['any'],
  app: vue,
})

window.__vue = vue
vue.$mount('#app')
