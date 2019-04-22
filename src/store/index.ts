import Vue, {ComponentOptions} from 'vue'
import Vuex, {Store} from 'vuex'
import aside, {AsideState} from './aside'
Vue.use(Vuex)

export interface State {
  aside: AsideState,
}

export default <V extends Vue>(
  app: ComponentOptions<V>) => {
  app.store = new Store<State>({
    modules: {
      aside,
    },
  })
  return app.store
}
