import Vue from 'vue'
import Component from 'vue-class-component'

export {Emit, Inject, Mixins, Model, Prop, Provide, Watch} from 'vue-property-decorator'
export {namespace, State, Mutation, Action, Getter} from 'vuex-class'

// this list will deal as a hook
Component.registerHooks([
  'middleware',
])

export {Component, Vue}
