import {Component, Prop, Vue} from '~/vue-ts'
import {State, StateInfo, StateOptions} from './types'

@Component
export default class StateMixin<O extends StateOptions = StateOptions> extends Vue {
  nativeStates: StateInfo[]

  findStateIndex(id: string): number {
    return this.nativeStates.findIndex((value: StateInfo) => (value.id === id))
  }

  findState(id: string): StateInfo | undefined {
    const index = this.findStateIndex(id)
    if(index < 0){
      return
    }
    return this.nativeStates[index]
  }

  updateStates(state: State, options: O, ids: string[]) {
    ids.forEach((id: string) => {
      const newState = {id, ...state}
      const index = this.findStateIndex(id)
      if(index < 0){
        this.nativeStates.push(newState)
      }else{
        this.nativeStates.splice(index, 1, newState)
      }
    })
  }
}
