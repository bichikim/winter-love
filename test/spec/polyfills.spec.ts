import {expect} from 'chai'
import '~/polyfills'

describe('polyfills', function test() {
  describe('Array', function test() {
    it('should have forEach', function forEach() {
      const test: string[] = ['a', 'b']
      const result: string[] = []
      test.forEach((item) => {
        result.push(item)
        if(item === 'a'){
          return false
        }
      })
      expect(result).to.deep.equal(['a'])
    })
    it('should have chunk', function test() {
      const test = ['a', 'b']
      const result = test.chunk(1)
      expect(result).to.deep.equal([['a'], ['b']])
    })
    it('should have compact', function test() {
      const test = ['a', 'b', false, '']
      const result = test.compact()
      expect(result).to.deep.equal(['a', 'b'])
    })
    it('should have difference', function test() {
      const test = ['a', 'b', 'c']
      const result = test.difference(['a', 'b', 'd'], ['a'])
      expect(result).to.deep.equal(['c'])
    })
    it('should have differenceBy', function test() {
      const test = [2.1, 1.2]
      const result = test.differenceBy([2.3, 3.4], Math.floor)
      expect(result).to.deep.equal([1.2])
    })
  })

  describe('Object', function test() {
    it('should have static forEach', function test() {
      const test = {foo: 'foo', bar: 'bar'}
      Object.forEach(test, (item, key) => {
        expect(item).to.equal(key)
      })
    })
  })

  describe('String', function test() {
    it('should have camelCase', function test() {
      expect('foo_bar'.camelCase()).to.equal('fooBar')
    })
    it('should have capitalize', function test() {
      expect('foo_bar'.capitalize()).to.equal('Foo_bar')
    })
    it('should have deburr', function test() {
      expect('déjà vu'.deburr()).to.equal('deja vu')
    })
  })
})
