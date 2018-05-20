import Element from 'element-ui'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueWhiteSpace from '~/vue-white-space'

// noinspection JSUnusedGlobalSymbols
export default () => {
  Vue.use(Element)
  Vue.use(VueI18n)
  Vue.use(VueWhiteSpace)
}
