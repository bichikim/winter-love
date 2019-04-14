import Vue, {ComponentOptions} from 'vue'
import Vuex, {Store} from 'vuex'
Vue.use(Vuex)

export interface State {
  //
}

export default <V extends Vue>(
  app: ComponentOptions<V>) => {
  app.store = new Store({
  })
  return app.store
}
