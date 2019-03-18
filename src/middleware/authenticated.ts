import {MiddlewareContext} from '~/utils/middleware'
export function beforeEach(ctx: MiddlewareContext<any, any>) {
  console.log('authenticated', ctx)
}
