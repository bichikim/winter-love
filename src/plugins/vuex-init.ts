//const CODE_NAME = '__vuex_init__'
import {assignInfinity} from '~/assign'
export default (context) => {
  const {store , env} = context
  assignInfinity(store.state, env, {safeMode: true})
}


