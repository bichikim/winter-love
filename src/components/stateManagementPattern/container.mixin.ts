import uuid from 'uuid/v1'
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {Item} from './types'

@Component
export default class ContainerMixin extends Vue {
  @Prop({default: () => ([])}) items: Item[]
  @Prop({default: uuid()}) id: string
  @Prop() content: string
}
