import Vue, { ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import {componentFactory} from 'vue-class-component/lib/component'
import {VueClass} from 'vue-class-component/lib/declarations'

export {Emit, Inject, Mixins, Model, Prop, Provide, Watch} from 'vue-property-decorator'
export {namespace, State, Mutation, Action, Getter} from 'vuex-class'

// this list will deal as a hook
Component.registerHooks([
  'middleware',
  'layout',
])

export {Component, Vue}
