import Element from 'element-ui'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueWhiteSpace from '~/vue-white-space'
import VueRequire from '~/vue-require'

// noinspection JSUnusedGlobalSymbols
export default () => {
  Vue.use(Element)
  Vue.use(VueI18n)
  Vue.use(VueWhiteSpace)
  Vue.use(VueRequire)
}
