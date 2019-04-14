import Vue from 'vue'
import middleware, {Options} from '~/lib/middleware'
import {Context} from '~/lib/type'
export default <V extends Vue, S>(
  context: Context<V, S>,
  options: Options,
  ) => {
  middleware<any, any>(context, {...options})
}
