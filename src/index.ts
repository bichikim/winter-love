import Touch, {Options as TouchOption} from '@/plugins/touch'
import quasar from 'quasar'
import Vue, {ComponentOptions} from 'vue'
import App from './App.vue'
import firebase from './firebase'
import middleware from './middleware'
import router from './router'
import store from './store'

const env: Project.ENV = process.env.ENV

Vue.use(quasar)
Vue.use<TouchOption>(Touch, {
  longPress: {
    default: {},
    varyLong: {
      timeInterval: 1000,
    },
  },
})

const vueOptions: ComponentOptions<Vue> = {
  render: (h) => (h(App)),
  router: router(),
  store: store(),
  firebase: firebase(env.firebase),
  env,
}

const vue = new Vue(vueOptions)

middleware<any, any>(vueOptions.router, vueOptions.store, {
  always: ['any'],
  app: vue,
})

window.__vue = vue
vue.$mount('#app')
