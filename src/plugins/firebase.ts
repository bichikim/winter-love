import {Context} from '@/types/project'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
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
  context: Context<A, S, V>,
  options: VueFireObjectOptions,
  ) => {
  if(options){
    const {app} = context
    app.fireBase  = firebase.initializeApp(options)
    app.fireStore = firebase.firestore()
    app.fireAuth = firebase.auth()
    return context
  }
}
