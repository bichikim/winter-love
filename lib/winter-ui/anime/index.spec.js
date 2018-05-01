import Anime from './'
import {mount} from 'avoriaz'

describe('Anime', () => {
  it('can ', () => {
    const wrapper = mount(Anime)
    expect(wrapper.vm.$el.classList).to.deep.equal(['anime'])
  })
})
