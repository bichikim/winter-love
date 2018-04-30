/**
 *
 * @author Bichi Kim <bichi@live.co.kr> <bichi@pjfactory.com>
 */
import assign from './index.ts'

describe('Assign', () => {
  it('has members', () => {
    expect(assign).to.be.a('function')
  })
  let object
  let sources
  let result
  afterEach(() => {
    expect(object).to.deep.equal(result)
  })
  describe('assign', () => {
    beforeEach(() => {
      object = {
        foo: 'state1',
        bar: 'state2',
        john: {
          foo: 'jState1',
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
      sources = {
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
      expect(object.foo).to.equal('payload1')
      expect(object.bar).to.equal('payload2')
      expect(object.john.foo).to.equal('jPayload1')
      expect(object.john.bar).to.equal('jPayload2')
      expect(object.john.john.foo).to.equal('jjPayload1')
      expect(object.john.john.bar).to.equal('jjPayload2')
      expect(object.john.john.john.foo).to.equal('jjjPayload1')
      expect(object.john.john.john.bar).to.equal('jjjPayload2')
    })
    it('should assign deeply and infinitely', () => {
      result = assign(object, sources)
      expect(object.john.john.can).to.equal('payload3')
    })
    it('should assign deeply and infinitely in safe mode', () => {
      result = assign(object, sources, {safeMode: true})
      expect(object.john.john.can).to.be.an('undefined')
    })
    it('should assign deeply limit', () => {
      result = assign(object, sources, {limit: 2})
      expect(object.john.john.can).to.be.an('payload3')
    })
  })
})
