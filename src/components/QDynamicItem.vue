<template lang="pug">
  q-expansion-item(
    v-if="item.items"
    :label="item.title"
    @click="handleClick"
    )
    q-list
      template(v-for="(nextItem, index) in item.items")
        q-dynamic-item(:item="nextItem" :key="index" @to="handleTo")
  q-item(v-else clickable v-ripple @click="handleClick")
    q-item-section(v-if="item.icon" avatar)
      q-icon(:name="item.icon")
    q-item-section {{item.title}}
</template>

<script lang="ts">
import {Component, Vue, Prop} from '~/vue-ts'
import {NavItem, NavTo} from './types/navigation'
@Component
export default class QDynamicItem extends Vue {
  @Prop() item: NavItem

  get path() {
    const {to, title} = this.item
    if(!to){
      return title
    }
    if(typeof to === 'string'){
      return to
    }
    return to.path ? to.path : title
  }

  handleTo(to: NavTo) {
    const {path} = to
    let myTo = to
    if(path && /^\//.test(path)){
      myTo = {
        ...myTo,
        path: [this.path, path].join('/'),
      }
    }
    this.$emit('to', myTo)
  }

  handleClick() {
    const {to} = this.item
    let myTo: any = to
    if(typeof to === 'string'){
      myTo = {
        path: to,
      }
    }
    this.$emit('to', myTo)
  }
}
</script>

<style scoped lang="stylus">

</style>
