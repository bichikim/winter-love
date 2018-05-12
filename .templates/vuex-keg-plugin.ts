import {Store, ActionContext} from 'vuex'
export default (options?: any) => {
  // init plugin
  return (store: Store<any>) => {
    // init store
    return (context: ActionContext<any, any>, payload: any) => {
      // int context & payload
      return (prams?: any) => {
        // logic
      }
    }
  }
}
