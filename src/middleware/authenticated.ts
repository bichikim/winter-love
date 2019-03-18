import {MiddlewareContext} from '~/utils/middleware'
export function beforeEach(ctx: MiddlewareContext<any, any>) {
  console.log('ran authenticated', ctx)
}
