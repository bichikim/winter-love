import Quasar from 'quasar/dist/quasar.esm'
import Vue from 'vue'

export default () => {
  window.quasarConfig = {
    primary: '#e46262',
  }
  Vue.use(Quasar)
}
