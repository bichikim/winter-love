import WhiteSpace from './WhiteSpace.vue'
import {mount, createLocalVue} from '@vue/test-utils'
describe('test.spec.js', () => {
  it('should add <dr> with a content of props ', () => {
    const localVue = createLocalVue()
    const content = 'foo\n bar\n'
    const wrapper = mount(WhiteSpace,{
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
    const wrapper = mount(WhiteSpace,{
      localVue,
      slots: {
        default: [content, content],
      },
    })
    expect(wrapper.html()).to.include('foo<br> bar<br>foo<br> bar<br>')
  })
})

