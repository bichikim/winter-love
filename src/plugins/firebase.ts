import firebase from 'firebase'
import Vue, {ComponentOptions} from 'vue'
import VueFire from 'vuefire'

type VueFireOptions = VueFireObjectOptions & Project.ENVFirebase

interface VueFireObjectOptions {
}

export default <V extends Vue>(
  app: ComponentOptions<V>,
  options: VueFireOptions,
  ) => {
  if(options){
    firebase.initializeApp(options)
    Vue.use(VueFire)
    app.firebase = options
    return app
  }
  console.warn('no firebase')
}
