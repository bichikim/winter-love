import {MiddlewareContext} from '~/utils/middleware'
export function afterEach(ctx: Required<MiddlewareContext<any, any>>) {
  console.log('ran any', ctx)
}
