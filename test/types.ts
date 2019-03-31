import {AfterMiddlewareContext, MiddlewareContext} from '@/middleware'

export interface TestApp {
  returnBfCtx: (ctx: MiddlewareContext, name?: string) => void
  returnBfrCtx: (ctx: MiddlewareContext, name?: string) => void
  returnAfCtx: (ctx: AfterMiddlewareContext, name?: string) => void
}
