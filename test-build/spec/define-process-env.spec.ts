import {expect} from 'chai'
import {defineProcessEnv} from '~~/build/utils/define-process-env'
describe('define-process-env', function test() {
  it('should return object for DefinePlugin', function test() {
    const result = defineProcessEnv('myDefine', 'foo')
    expect(result).to.deep.equal({'process.env.MY_DEFINE': '"foo"'})
  })
  it('should return object with prefix', function test() {
    const result = defineProcessEnv('myDefine', 'foo', 'prefix')
    expect(result).to.deep.equal({'process.env.PREFIX.MY_DEFINE': '"foo"'})
  })
  it('should return object with array prefix', function test() {
    const result = defineProcessEnv('myDefine', 'foo', ['pre', 'fix'])
    expect(result).to.deep.equal({'process.env.PRE.FIX.MY_DEFINE': '"foo"'})
  })
})
