<template lang="pug">
  .s-m-container(@click.stop="handleActive" :class="{active: isState('active')}")
    sm-content(v-if="content" v-bind="content")
    sm-container(
      v-if="items"
      v-for="(item, index) in items"
      v-bind="item"
      :parent="itemData"
      :key="index"
      :state="state"
      )
</template>

<script lang="ts">
import {
  Component, Mixins,
} from 'vue-property-decorator'
import SmContent from '@/components/stateManagementPattern/SmContent.vue'
import ContainerMixin from './container.mixin'

@Component({
  components: {
    SmContainer,
    SmContent,
  },
})
export default class SmContainer extends Mixins(ContainerMixin) {
  handleActive() {
    this.updateState('active', true)
  }
}
</script>

<style scoped lang="stylus">
  .s-m-container
    display flex
    border solid 1px black
    padding 5px
    &.active
      border solid 1px red
</style>
