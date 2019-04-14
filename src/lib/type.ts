import Vue, {ComponentOptions} from 'vue'
import Router from 'vue-router'
import {Store} from 'vuex'

export interface Context<V extends Vue, S> {
  app: ComponentOptions<V>
  store: Store<S>
  router: Router
}
