import uuid from 'uuid/v1'
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {Item} from './types'

@Component
export default class ContainerMixin extends Vue {
  @Prop({default: () => ([])}) items: Item[]
  @Prop({required: true}) id: string
  @Prop() content: string

  get _items(): Item[] {
    return this.items.map((item: Item) => {
      if(!item.id){
        item.id = uuid()
      }
      return item
    })
  }
}
