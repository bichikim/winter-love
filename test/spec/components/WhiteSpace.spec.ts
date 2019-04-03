import {createLocalVue, mount} from '@vue/test-utils'
import {expect} from 'chai'
import WhiteSpace from '../../../src/components/WhiteSpace.vue'
describe('WhiteSpace.vue', () => {
  it('should add <dr> with a content of props ', () => {
    const localVue = createLocalVue()
    const content = 'foo\n bar\n'
    const wrapper = mount(WhiteSpace, {
      localVue, propsData: {
        content,
      },
    })
    expect(wrapper.props().content).to.equal(content)
    expect(wrapper.html()).to.include('foo<br> bar<br>')
  })
  it('should add <br> with slot default', () => {
    const localVue = createLocalVue()
    const content = 'foo\n bar\n'
    const wrapper = mount(WhiteSpace, {
      localVue,
      slots: {
        default: [content, content],
      },
    })
    expect(wrapper.html()).to.include('foo<br> bar<br>foo<br> bar<br>')
  })
})
