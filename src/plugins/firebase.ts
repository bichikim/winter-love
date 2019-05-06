import {Context} from '@/types/project'
import firebase from 'firebase'
import Vue from 'vue'
// import VueFire from 'vuefire'

export interface VueFireObjectOptions {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
}

export default <A, S, V extends Vue = Vue>(
  context: Context<A, S , V>,
  options: VueFireObjectOptions,
  ) => {
  if(options){
    firebase.initializeApp(options)
    // Vue.use(VueFire)
    // app.firebase = options
    return context
  }
}
