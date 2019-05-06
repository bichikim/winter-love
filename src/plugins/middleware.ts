import {Context} from '@/types/project'
import Vue from 'vue'
import middleware, {Options} from '~/lib/middleware'
export default <A, S, V extends Vue = Vue>(
  context: Context<A, S, V>,
  options: Options,
  ) => {
  middleware<A, S, V, Context<A, S, V>>(context, {...options})
}
