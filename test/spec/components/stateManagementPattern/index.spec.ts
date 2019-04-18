import {createLocalVue, mount, Wrapper} from '@vue/test-utils'
import {expect} from 'chai'
import pretty from 'pretty'
import SMContainer from '@/components/stateManagementPattern/SmContainer.vue'
import SMContent from '@/components/stateManagementPattern/SmContent.vue'
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
    const wrapper = mount(SMContainer, {
      localVue, propsData: content,
    })
    expect(wrapper.props().items).to.equal(content.items)
    const labelElement: HTMLLabelElement = wrapper.find(SMContent).element as any
    expect(labelElement.tagName).to.equal(document.createElement('label').tagName)
    expect(labelElement.textContent).to.equal(_content.content.value)
    const containers = wrapper.findAll(SMContainer).wrappers
    const childContainers = containers.filter(childrenFilterFactory(wrapper))
    expect(childContainers).length(1)
    const grandChildContainers = containers.filter(childrenFilterFactory(childContainers[0]))
    expect(grandChildContainers).length(3)
    const inputElement: HTMLInputElement = grandChildContainers[1].find(SMContent).element as any
    expect(inputElement.tagName).to.equal(document.createElement('input').tagName)
    expect(inputElement.value).to.equal(_content.items[0].items[1].content.value)
  })
  it('should change State', function test() {
    const localVue = createLocalVue()
    const wrapper = mount(SMContainer, {
      localVue, propsData: content,
    })
    expect(wrapper.props().states).to.be.an('array')
    const containers = wrapper.findAll(SMContainer).wrappers
    containers.forEach((_wrapper) => {
      expect(_wrapper.props().states).to.be.an('array')
    })
    expect(containers).length(6)
    const container: Wrapper<any> = containers[containers.length - 1]
    const parentContainer: Wrapper<any> = containers
      .filter((wrapper: Wrapper<any>) => {
      return wrapper.vm === container.vm.$parent
    })[0]

    // change state
    parentContainer.vm.updateStates(container.props().id, {active: true})
    {
      const states = parentContainer.props().states
      expect(states).to.length(1)
      expect(states[0]).to.deep.equal({id: container.props().id, active: true})
    }
    // change state twice
    parentContainer.vm.updateStates(container.props().id, {active: true})
    {
      const states = parentContainer.props().states
      expect(states).to.length(1)
      expect(states[0]).to.deep.equal({id: container.props().id, active: true})
    }
    // check updating parents
    {
      const rootStates = containers[0].props().states
      expect(rootStates[0].active).to.equal(undefined)
      expect(rootStates[0].id).to.equal(containers[1].props().id)
      expect(rootStates[0].children).to.equal(containers[1].props().states)
      const nextStates = containers[1].props().states
      expect(nextStates[0].active).to.equal(undefined)
      expect(nextStates[0].id).to.equal(containers[4].props().id)
      expect(nextStates[0].children).to.equal(containers[4].props().states)
    }

    // change state bubble
    parentContainer.vm.resetStates()
    parentContainer.vm.updateStates(container.props().id, {active: true}, {bubble: true})

    // check updating parents
    {
      const rootStates = containers[0].props().states
      expect(rootStates[0].active).to.equal(true)
      expect(rootStates[0].id).to.equal(containers[1].props().id)
      expect(rootStates[0].children).to.equal(containers[1].props().states)
      const nextStates = containers[1].props().states
      expect(nextStates[0].active).to.equal(true)
      expect(nextStates[0].id).to.equal(containers[4].props().id)
      expect(nextStates[0].children).to.equal(containers[4].props().states)
    }

    parentContainer.vm.resetStates()
    containers.forEach((wrapper) => {
      console.log(wrapper.props().content, wrapper.props().states)
    })
    // change state multi
  })
})
