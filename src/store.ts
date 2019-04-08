import Vue, {ComponentOptions} from 'vue'
import Vuex, {Store} from 'vuex'
Vue.use(Vuex)

export default <V extends Vue>(
  app: ComponentOptions<V>) => {
  app.store = new Store({
  })
}
