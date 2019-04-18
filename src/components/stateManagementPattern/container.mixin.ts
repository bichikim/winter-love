import uuid from 'uuid/v1'
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {Content, Item, State, UpdateStateOptions} from './types'

@Component
export default class ContainerMixin extends Vue implements Item {
  static createId() {
    return uuid()
  }

  @Prop({default: () => ([])}) items: Item[]
  @Prop({required: true}) parent: Item
  @Prop({default: () => (ContainerMixin.createId())}) id: string
  @Prop() content: Content
  @Prop({default: () => ({})}) state: State

  get itemData(): Item {
    const {id, items, content, parent} = this
    return {id, items, content, parent}
  }

  isState(name: string) {
    const myState = this.state[name] || []
    return myState.findIndex((item: Item) => (item.id === this.id)) > -1
  }

  updateState(name: string, active: boolean, options: UpdateStateOptions = {}) {
    const {multi = false} = options
    const myState = this.state[name] || []
    if(!multi){
      myState.splice(0)
    }
    if(active){
      myState.push(this.itemData)
    }else{
      const index = myState.findIndex((item: Item) => (item.id === this.id))
      if(index > -1){
        myState.splice(index, 1)
      }
    }
    this.$set(this.state, name, myState)
  }
}
