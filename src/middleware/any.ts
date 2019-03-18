import {MiddlewareContext} from '~/utils/middleware'
export function afterEach(ctx: MiddlewareContext<any, any>) {
  console.log('passed', ctx)
}
