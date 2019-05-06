import Touch, {Options as TouchOption} from '@/lib/touch'
import {Context} from '@/types/project'
import Vue from 'vue'

export default <A, S, V extends Vue = Vue>(
  context: Context<A, S, V>,
  options: TouchOption,
  ) => {
  Vue.use<TouchOption>(Touch, options)
}
