<template lang="pug">
  .s-m-container
    s-m-content(v-bind="content")
    s-m-container(
      v-if="items"
      v-for="(item) in items"
      v-bind="item"
      :states="states.children"
      @update-states="updateStates"
      )
</template>

<script lang="ts">
import {
  Component, Prop, Mixins,
} from 'vue-property-decorator'
import SMContent from './SMContent.vue'
import StateMixin from './state.mixin'

@Component({
  components: {
    SMContainer,
    SMContent,
  },
})
export default class SMContainer extends Mixins(StateMixin) {

}
</script>

<style scoped lang="stylus">
  .s-m-container
    display flex
</style>
