import Element from 'element-ui'
import Vue from 'vue'
// import VueAnalytics from 'vue-analytics'
import VueI18n from 'vue-i18n'

// noinspection JSUnusedGlobalSymbols
export default ({isServer, isClient}) => {
  Vue.use(Element)
  Vue.use(VueI18n)
  if(isServer){
    // nothing to run
  }

  if(isClient){
    // Vue.use(VueAnalytics)
  }
}
