/**
 *
 * @author Bichi Kim <bichi@live.co.kr> <bichi@pjfactory.com>
 */
import assign from './index.ts'

describe('Assign', function() {
  it('has members', () => {
    expect(assign).to.be.a('function')
  })
  afterEach(() => {
    expect(this.object).to.deep.equal(this.result)
  })
  describe('assign', () => {
    beforeEach(() => {
      this.object = {
        foo: '',
        bar: null,
        john: {
          foo: false,
          bar: 'jState2',
          john: {
            foo: 'jjState1',
            bar: 'jjState2',
            john: {
              foo: 'jjjState1',
              bar: 'jjjState2',
            },
          },
        },
      }
      this.sources = {
        foo: 'payload1',
        bar: 'payload2',
        john: {
          foo: 'jPayload1',
          bar: 'jPayload2',
          john: {
            foo: 'jjPayload1',
            bar: 'jjPayload2',
            can: 'payload3',
            john: {
              foo: 'jjjPayload1',
              bar: 'jjjPayload2',
            },
          },
        },
      }
    })
    afterEach(() => {
      const {object} = this
      expect(object.foo).to.equal('payload1')
      expect(object.bar).to.equal('payload2')
      expect(object.john.foo).to.equal('jPayload1')
      expect(object.john.bar).to.equal('jPayload2')
    })
    it('should assign deeply and infinitely', () => {
      this.result = assign(this.object, this.sources)
      expect(this.object.john.john.can).to.equal('payload3')
      const {object} = this
      expect(object.john.john.foo).to.equal('jjPayload1')
      expect(object.john.john.bar).to.equal('jjPayload2')
      expect(object.john.john.john.foo).to.equal('jjjPayload1')
      expect(object.john.john.john.bar).to.equal('jjjPayload2')
    })
    it('should assign deeply and infinitely in safe mode', () => {
      this.result = assign(this.object, this.sources, {safeMode: true})
      expect(this.object.john.john.can).to.be.an('undefined')
      const {object} = this
      expect(object.john.john.foo).to.equal('jjPayload1')
      expect(object.john.john.bar).to.equal('jjPayload2')
      expect(object.john.john.john.foo).to.equal('jjjPayload1')
      expect(object.john.john.john.bar).to.equal('jjjPayload2')
    })
    it('should assign deeply limit', () => {
      this.result = assign(this.object, this.sources, {limit: 2})
      const {object} = this
      expect(object.john.john.foo).to.equal('jjState1')
      expect(object.john.john.bar).to.equal('jjState2')
      expect(object.john.john.can).to.be.an('undefined')
    })
  })
})
