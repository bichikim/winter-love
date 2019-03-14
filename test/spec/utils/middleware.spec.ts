import {expect} from 'chai'
import middleware from '~/utils/middleware'
class RouterMock {
  _beforeEach: any[] = []
  _beforeResolve: any[] = []
  _afterEach: any[] = []
  beforeEach(fn: any) {
    this._beforeEach.push(fn)
  }
  beforeResolve(fn: any) {
    this._beforeResolve.push(fn)
  }
  afterEach(fn: any) {
    this._afterEach.push(fn)
  }
}
describe('middleware', () => {
  it('should register all middleware', () => {
    const router = new RouterMock()
    middleware(router as any)
    expect(router._beforeEach).to.equal('')
  })
})
