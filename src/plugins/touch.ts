import Touch, {Options as TouchOption} from '@/lib/touch'
import Vue from 'vue'

export default (app: any, options: TouchOption) => {
  Vue.use<TouchOption>(Touch, options)
}
