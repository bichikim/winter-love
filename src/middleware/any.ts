import {MiddlewareContext} from '@/lib/middleware'
export function afterEach(ctx: Required<MiddlewareContext<any, any>>) {
  console.log('ran any', ctx)
}
