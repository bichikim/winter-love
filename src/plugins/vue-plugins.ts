import Element from 'element-ui'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueCdnScript from '~/vue-inject-script'
import VueWhiteSpace from '~/vue-white-space'

// noinspection JSUnusedGlobalSymbols
export default () => {
  Vue.use(Element)
  Vue.use(VueI18n)
  Vue.use(VueCdnScript, {
    src: ['https://apis.google.com/js/client:platform.js'],
  })
  Vue.use(VueWhiteSpace)
}
