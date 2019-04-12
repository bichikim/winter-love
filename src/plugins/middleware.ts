import Vue, {ComponentOptions} from 'vue'
import middleware, {Options} from '~/lib/middleware'
export default <V extends Vue>(
  app: ComponentOptions<V>,
  options: Options<any>,
  ) => {
  if(!app.store || !app.router){
    throw new Error('app should have store and router')
  }
  middleware<any, any>(app.router, app.store, {...options, app})
}
