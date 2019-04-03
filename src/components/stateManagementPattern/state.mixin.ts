import {Component, Mixins, Prop} from '~/vue-ts'
import ContainerMixin from './container.mixin'
import {State, StateInfo, StateOptions} from './types'

@Component
export default class StateMixin<
  O extends StateOptions = StateOptions
  > extends Mixins(ContainerMixin) {
  static EV_UPDATE_STATES = 'update-states'

  @Prop({default: () => ([])}) states: StateInfo[]

  findStateIndex(id: string): number {
    return this.states.findIndex((value: StateInfo) => (value.id === id))
  }

  findState(id: string): StateInfo | undefined {
    const index = this.findStateIndex(id)
    if(index < 0){
      return
    }
    return this.states[index]
  }

  resetStates() {
    this.states.splice(0)
    this.$emit(StateMixin.EV_UPDATE_STATES, this.id, {}, this.states)
  }

  updateStates(id: string, state: State, options?: O, children?: StateInfo[]) {
    const index = this.findStateIndex(id)
    const {bubble = false, multi = false} = options || {}
    const newState: StateInfo = {id, ...state}
    if(children){
      newState.children = children
    }
    if(index < 0){
      this.states.push(newState)
    }else{
      this.states.splice(index, 1, newState)
    }

    const nextState = bubble ? state : {}
    this.$emit(StateMixin.EV_UPDATE_STATES, this.id, nextState, options, this.states)
  }
}
