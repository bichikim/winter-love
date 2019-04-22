import Vue, {ComponentOptions} from 'vue'
import Vuex, {Store} from 'vuex'
import aside from './aside'
Vue.use(Vuex)

export interface State {
  //
}

export default <V extends Vue>(
  app: ComponentOptions<V>) => {
  app.store = new Store({
    modules: {
      aside,
    },
  })
  return app.store
}
