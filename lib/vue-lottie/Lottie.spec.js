import Lottie from './Lottie'
import example from './example.json'
import {mount, createLocalVue} from '@vue/test-utils'
describe('test.spec.js', () => {
  it('should add <dr> with a content of props ', () => {
    const localVue = createLocalVue()
    const wrapper = mount(Lottie,{
      localVue, propsData: {
        animationData: example,
      },
    })
    expect(wrapper.props().animationData).to.equal(example)
    expect(wrapper.html()).to.include('<div></div>')
  })
})

