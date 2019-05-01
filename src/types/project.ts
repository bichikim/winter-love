import {Context as OriginalContext} from '@/lib/middleware'
import Vue from 'vue'

export interface Context<
  A, S, V extends Vue = Vue,
  > extends OriginalContext<A, S, V>{
  // empty
}
