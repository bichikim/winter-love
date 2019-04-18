import Quasar from 'quasar/dist/quasar.common'
import iconSet from 'quasar/icon-set/ionicons-v4'
import Vue from 'vue'

export default () => {
  Vue.use(Quasar, {
    config: {
      brand: {
        primary: '#e46262',
      },
    },
    iconSet,
  })
}
