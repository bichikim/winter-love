import {Route} from 'vue-router'
import {Next} from 'vue-router/next'
export function beforeEach(to: Route, from: Route, next: Next) {
  console.log('passed')
}
