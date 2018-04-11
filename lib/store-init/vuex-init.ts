//const CODE_NAME = '__vuex_init__'
import assign from '~/assign'
export default (context) => {
  const {store , env} = context
  assign(store.state, env, {safeMode: true})
}


