import {IVueI18n} from 'vue-i18n'
import {Store} from 'vuex'
export interface IApp {
  i18n: IVueI18n
}

export interface IContext {
  app: IApp
  store: Store<any>
}
