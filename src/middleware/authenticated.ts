import {MiddlewareContext} from '@/lib/middleware'
export function beforeEach(ctx: MiddlewareContext<any, any>) {
  console.log('ran authenticated', ctx)
}
