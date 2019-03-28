import Vue from 'vue'
import Touch, {Options as TouchOption} from '~/plugins/touch'
import App from './App.vue'
import router from './router'
import store from './store'
import middleware from './utils/middleware'

Vue.use<TouchOption>(Touch, {
  longPress: {
    default: {},
    varyLong: {
      timeInterval: 1000,
    },
  },
})

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
