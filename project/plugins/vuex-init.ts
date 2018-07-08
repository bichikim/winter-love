import assign from 'infinity-assign'
const CALL_NAME = '__vuex_init__'

/**
 * Set env in Vuex store
 * @param context
 */
export default (context: any) => {
  if(!process.browser){return}
  const {store, env} = context
  if(env && env.store){
    store.hotUpdate({
      mutations: {
        [CALL_NAME](state: any, payload: any) {
          assign(state, payload, {safeMode: true})
        },
      },
    })
    store.commit(CALL_NAME, env.store)
  }
}
