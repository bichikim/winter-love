import firebase from 'firebase'
import Vue, {ComponentOptions} from 'vue'
// import VueFire from 'vuefire'

type VueFireOptions = VueFireObjectOptions & Project.ENVFirebase

export interface VueFireObjectOptions {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
}

export default <V extends Vue>(
  app: ComponentOptions<V>,
  options: VueFireOptions,
  ) => {
  if(options){
    firebase.initializeApp(options)
    // Vue.use(VueFire)
    // app.firebase = options
    return app
  }
}
