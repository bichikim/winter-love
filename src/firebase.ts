import firebase from 'firebase'
import Vue from 'vue'
import VueFire from 'vuefire'

type VueFireOptions = VueFireObjectOptions

interface VueFireObjectOptions {
}

export default (
  options: Project.ENVFirebase,
  vueFireOptions?: VueFireOptions,
  ) => {
  if(options){
    firebase.initializeApp(options)
    Vue.use(VueFire)
    return vueFireOptions
  }
  console.warn('no firebase')
}
