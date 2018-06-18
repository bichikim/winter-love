import assign from '~/assign'
const CALL_NAME = '__vuex_init__'

/**
 * Set env in Vuex store
 * @param context
 */
export default (context) => {
  console.log(context.app)
  const {store, env} = context
  if(!process.browser){return}

  if(env && env.store){
    store.hotUpdate({
      mutations: {
        [CALL_NAME](state, payload) {
          assign(state, payload, {safeMode: true})
        },
      },
    })
    store.commit(CALL_NAME, env.store)
  }
}
