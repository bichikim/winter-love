<template lang="pug">
  q-expansion-item(
    @click="handleClick"
    v-bind="{contentInsetLevel, expandSeparator, label: title, icon}"
    v-if="item.items"
  )
    q-list
      template(v-for="(nextItem, index) in item.items")
        q-dynamic-item(:item="nextItem" :key="index" @to="handleTo")
  q-item(
    @click="handleClick"
    clickable
    v-else
    v-ripple
  )
    q-item-section(v-if="item.icon" avatar)
      q-icon(:name="item.icon")
    q-item-section {{item.title}}
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {NavItem, NavTo} from './types/navigation'
@Component
export default class QDynamicItem extends Vue {
  @Prop() item: NavItem
  @Prop({default: 0.5}) contentInsetLevel: number
  @Prop({default: true}) expandSeparator: boolean

  get title() {
    return this.item.title
  }

  get icon() {
    return this.item.icon
  }

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
