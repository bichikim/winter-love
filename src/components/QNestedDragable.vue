<template lang="pug">
  draggable.drag-area(tag="ul" :list="items" :group="{name: group}")
    li(v-for="item in items" :key="item.id")
      span {{item.name}}
      q-nested-dragable(v-if="item.items" :items="item.items")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import draggable from 'vuedraggable'
import {Item} from './types/nested'
import QItem from './QItem.vue'

@Component({
  components: {
    draggable,
  },
})
export default class QNestedDragable extends Vue {
  @Prop() items: Item[]
  @Prop({default: 'group'}) group: string
}
</script>

<style scoped lang="stylus">
  .drag-area
    min-height 50px
    outline 1px dashed
</style>
