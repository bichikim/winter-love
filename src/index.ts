import element from '@/plugins/element'
import firebase from '@/plugins/firebase'
import touch from '@/plugins/touch'
import Vue, {ComponentOptions} from 'vue'
import App from './App.vue'
import middleware from './middleware'
import router from './router'
import store from './store'

const env: Project.ENV = process.env.ENV

const app: ComponentOptions<Vue> = {
  render: (h) => (h(App)),
  env,
}

touch(app, {
  longPress: {
    default: {},
    varyLong: {
      timeInterval: 1000,
    },
  },
})
firebase<Vue>(app, env.firebase)
store<Vue>(app)
router<Vue>(app)
element()

const vue = new Vue(app)

middleware<any, any>(app.router, app.store, {
  always: ['any'],
  app: vue,
})

window.__vue = vue
vue.$mount('#app')
