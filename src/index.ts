import Vue from 'vue'
import App from './App.vue'
import register from './register'
const options: any = register()
window.__vue = new Vue({
  el: '#app',
  render: (h) => (h(App)),
  ...options,
})
