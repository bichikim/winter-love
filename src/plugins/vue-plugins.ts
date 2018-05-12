import Element from 'element-ui'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueCdnScript from '~/vue-cdn-script'

// noinspection JSUnusedGlobalSymbols
export default () => {
  Vue.use(Element)
  Vue.use(VueI18n)
  if(process.server){
    // nothing to run
  }

  if(process.client){
    Vue.use(VueCdnScript, {
      src: ['https://apis.google.com/js/client:platform.js'],
    })
  }
}
