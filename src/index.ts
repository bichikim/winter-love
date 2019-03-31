import firebase from 'firebase'
import Vue from 'vue'
import Touch, {Options as TouchOption} from '~/plugins/touch'
import App from './App.vue'
import middleware from './middleware'
import router from './router'
import store from './store'

const env: Project.ENV = process.env.ENV

if(env && env.firebase){
  firebase.initializeApp(env.firebase)
}else{
  console.warn('no firebase')
}

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
  env,
})

middleware<any, any>(router, store, {
  always: ['any'],
  app: vue,
})

window.__vue = vue
vue.$mount('#app')
