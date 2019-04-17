/* tslint:disable:no-misused-new */
import polyfify from '@/lib/polyfify'
import {expect} from 'chai'

describe('polyfify', function test() {

  it('should add prototype', function test() {

    class Test {
    }

    interface Test {
      foo: string,
    }

    polyfify<Test>(Test, 'foo', 'foo')

    const test = new Test()
    expect(test.foo).to.equal('foo')
  })

  it('should add prototype with binding this' , () => {
    class Test {
      bar: string = 'bar'
    }

    interface Test {
      foo: () => string,
    }

    polyfify<Test>(Test, 'foo', function factory(this: Test) {
      return 'foo' + this.bar
    })

    const test = new Test()
    expect(test.foo()).to.equal('foobar')
  })

  it('should skip prototype if use twice' , () => {
    class Test {
      bar: string = 'bar'
    }

    interface Test {
      foo: () => string,
    }

    polyfify<Test>(Test, 'foo', function factory(this: Test) {
      return 'foo' + this.bar
    })

    polyfify<Test>(Test, 'foo', 'foo')

    const test = new Test()
    expect(test.foo()).to.equal('foobar')
  })

  it('should add prototype if use twice with force option' , () => {
    class Test {
      bar: string = 'bar'
    }

    interface Test {
      foo: () => string,
    }

    polyfify<Test>(Test, 'foo', function factory(this: Test) {
      return 'foo' + this.bar
    })

    polyfify<Test>(Test, 'foo', 'foo', true)

    const test = new Test()
    expect(test.foo).to.equal('foo')
  })
})
