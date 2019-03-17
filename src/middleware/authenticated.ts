import {MiddlewareContext} from '~/utils/middleware'
export function beforeEach({}: MiddlewareContext<any, any>) {
  console.log('passed')
}
