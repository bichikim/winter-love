import {AfterMiddlewareContext, MiddlewareContext} from '@/middleware'
import {TestApp} from '../../types'
const name: string = 'md1'
export function beforeEach(ctx: MiddlewareContext<any, TestApp>) {
  ctx.app.returnBfCtx(ctx, name)
  ctx.next()
}

export function beforeResolve(ctx: MiddlewareContext<any, TestApp>) {
  ctx.app.returnBfrCtx(ctx, name)
  ctx.next()
}

export function afterEach(ctx: AfterMiddlewareContext<any, TestApp>) {
  ctx.app.returnAfCtx(ctx, name)
}
