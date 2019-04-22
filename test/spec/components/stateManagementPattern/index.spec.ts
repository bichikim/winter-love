import SmContainer from '@/components/stateManagementPattern/SmContainer.vue'
import SmContent from '@/components/stateManagementPattern/SmContent.vue'
import {createLocalVue, mount, Wrapper} from '@vue/test-utils'
import {expect} from 'chai'
import pretty from 'pretty'
import {Item} from '~/components/stateManagementPattern/types'

declare global {
  interface Console {
    html: any,
  }
}

const childrenFilterFactory = (parent: Wrapper<any>) => {
  return (wrapper: Wrapper<any>) => {
    return parent.vm === wrapper.vm.$parent
  }
}

describe('SMRoot.vue', function test() {
  const content: Item = {
    content: {value: 'content1'},
    items: [
      {
        content: {value: 'content2'},
        items: [
          {
            content: {value: 'content3'},
          },
          {
            content: {
              kind: 'input',
              value: 'content4',
            },
          },
          {
            items: [
              {
                content: {
                  kind: 'input',
                  value: 'content4',
                },
              },
            ],
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
    const _content: any = content
    const localVue = createLocalVue()
    const wrapper = mount(SmContainer, {
      localVue, propsData: content,
    })
    expect(wrapper.props().items).to.equal(content.items)
    const labelElement: HTMLLabelElement = wrapper.find(SmContent).element as any
    expect(labelElement.tagName).to.equal(document.createElement('label').tagName)
    expect(labelElement.textContent).to.equal(_content.content.value)
    const containers = wrapper.findAll(SmContainer).wrappers
    const childContainers = containers.filter(childrenFilterFactory(wrapper))
    expect(childContainers).length(1)
    const grandChildContainers = containers.filter(childrenFilterFactory(childContainers[0]))
    expect(grandChildContainers).length(3)
    const inputElement: HTMLInputElement = grandChildContainers[1].find(SmContent).element as any
    expect(inputElement.tagName).to.equal(document.createElement('input').tagName)
    expect(inputElement.value).to.equal(_content.items[0].items[1].content.value)
  })
  it('should change State', function test() {
    const localVue = createLocalVue()
    const wrapper = mount(SmContainer, {
      localVue, propsData: content,
    })
    expect(wrapper.props().state).to.be.an('object')
    const containers = wrapper.findAll(SmContainer).wrappers
    containers.forEach((_wrapper) => {
      expect(_wrapper.props().state).to.be.an('object')
    })
    expect(containers).length(6)
    const container: Wrapper<any> = containers[containers.length - 1]
    const firstContainer: Wrapper<any> | undefined = containers
      .find((wrapper: Wrapper<any>) => {
      return wrapper.vm === container.vm.$parent
    }) as Wrapper<any>

    expect(firstContainer).to.be.an('object')

    // change state
    firstContainer.vm.updateState('active', true)
    {
      const state = firstContainer.props().state
      expect(state.active).to.be.an('array')
      expect(state.active).to.length(1)
      expect(state.active[0].id).to.equal(firstContainer.props().id)
    }
    // change state twice
    firstContainer.vm.updateState('active', true)
    {
      const state = firstContainer.props().state
      expect(state.active).to.be.an('array')
      expect(state.active).to.length(1)
      expect(state.active[0].id).to.equal(firstContainer.props().id)
    }
    // check sharing state
    {
      const state = wrapper.props().state
      expect(state.active).to.be.an('array')
      expect(state.active).to.length(1)
      expect(state.active[0].id).to.equal(firstContainer.props().id)
      containers.forEach((_wrapper) => {
        const state = _wrapper.props().state
        expect(state.active).to.be.an('array')
        expect(state.active).to.length(1)
        expect(state.active[0].id).to.equal(firstContainer.props().id)
      })
    }

    // change single state only
    // change state
    const lastContainer: Wrapper<any> = containers[containers.length - 1]
    lastContainer.vm.updateState('active', true)


    // change state multi
  })
})
