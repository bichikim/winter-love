import Vue, { ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import {componentFactory} from 'vue-class-component/lib/component'
import {VueClass} from 'vue-class-component/lib/declarations'

export {Emit, Inject, Mixins, Model, Prop, Provide, Watch} from 'vue-property-decorator'
export {namespace, State, Mutation, Action, Getter} from 'vuex-class'

// this list will deal as a hook
Component.registerHooks([
  'middleware',
])

@Component
class App extends Vue {
  middleware?: string
}

interface AppComponentOptions extends ComponentOptions<App>{
  middleware?: string
}

function AppComponent(options: AppComponentOptions | VueClass<App>) {
  if(typeof options === 'function'){
    return componentFactory(options)
  }
  return function com(component: VueClass<App>) {
    return componentFactory(component, options)
  }
}

export {Component, App as Vue}
