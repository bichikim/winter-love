<template lang="pug">
  q-expansion-item(
    v-if="item.items"
    :label="item.title"
    @click="handleClick"
    )
    q-list
      template(v-for="(nextItem, index) in item.items")
        q-dynamic-item(:item="nextItem" :key="index")
  q-item(v-else to="item.to")
    q-item-section(v-if="item.icon" avatar)
      q-icon(:name="item.icon")
    q-item-section {{item.title}}
</template>

<script lang="ts">
import {Component, Vue, Prop} from '~/vue-ts'
import {NavItem} from './types/navigation'
@Component
export default class QDynamicItem extends Vue {
  @Prop() item: NavItem

  handleClick() {
    console.log(this.item.title, this.item.to)
  }
}
</script>

<style scoped lang="stylus">

</style>
