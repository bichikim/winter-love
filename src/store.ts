import {AsideState} from '@/states/aside'
import {dropRight, last} from 'lodash'
import Vue, {ComponentOptions} from 'vue'
import Vuex, {Store} from 'vuex'
Vue.use(Vuex)

export interface State {
  aside: AsideState,
}

const getModules = <V extends Vue>(app: ComponentOptions<V>) => {
  const context = require.context('@/states', false, /\.ts$/)
  const modules = {}
  context.keys().forEach((path: string) => {
    if(!/\/index\.ts$/.test(path)){
      let filename = last(path.split('/'))
      if(!filename){
        return
      }
      filename = dropRight(filename.split('.'), 1).join('.')
      const _module = context(path)
      const myModule = _module.default || _module
      if(typeof myModule === 'function'){
        modules[filename] = myModule(app)
        return
      }
      modules[filename] = myModule
    }
  })
  return modules
}

export default <V extends Vue>(
  app: ComponentOptions<V>) => {
  const modules = getModules<V>(app)

  app.store = new Store<State>({
    modules,
  })
  return app.store
}
