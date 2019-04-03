import {createLocalVue, mount} from '@vue/test-utils'
import {expect} from 'chai'
import pretty from 'pretty'
import SMContainer from '~/components/stateManagementPattern/SMContainer.vue'
import SMContent from '~/components/stateManagementPattern/SMContent.vue'
import SMRoot from '~/components/stateManagementPattern/SMRoot.vue'
import {Item} from '~/components/stateManagementPattern/types'

declare global {
  interface Console {
    html: any,
  }
}

describe('SMRoot.vue', function test() {
  const content: Item = {
    content: 'content1',
    items: [
      {
        content: 'content2',
        items: [
          {
            content: 'content3',
          },
          {
            content: 'content4',
          },
        ],
      },
    ],
  }
  before(() => {
    console.html = (...args) => (console.log(pretty(...args)))
  })
  after(() => {
    delete console.html
  })
  it('should render deep structure data', function test() {
    const localVue = createLocalVue()
    const wrapper = mount(SMRoot, {
      localVue, propsData: content,
    })
    expect(wrapper.props().items).to.equal(content.items)
    expect(wrapper.find(SMContent).text()).to.equal(content.content)
    const container = wrapper.findAll(SMContainer).wrappers.filter((_wrapper) => {
      return _wrapper.vm.$parent === wrapper.vm
    })
    expect(container).length(1)
    const nContainer = container[0].findAll(SMContainer).wrappers.filter((_wrapper) => {
      return _wrapper.vm.$parent === container[0].vm
    })
    expect(nContainer).length(2)
  })
})
