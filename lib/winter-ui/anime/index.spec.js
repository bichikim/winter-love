import Anime from './index.vue'
import {useFakeTimers} from 'sinon'
import {mount} from '@vue/test-utils'

describe('Anime', function() {
  beforeEach(() => {
    this.clock = useFakeTimers()
  })

  afterEach(() => {
    this.clock.restore()
  })
  it('can ', () => {
    const wrapper = mount(Anime)
    expect(wrapper.contains('.winter-anime')).to.equal(true)
  })
})