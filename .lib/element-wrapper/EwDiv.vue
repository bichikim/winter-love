<template lang="pug">
  .ew-div(:style="optionsStyles" v-on="$listeners")
    slot
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
const TOP = 'top'
const BOTTOM = 'bottom'
const CENTER = 'center'
const LEFT = 'left'
const RIGHT = 'right'

@Component
export default class EwDiv extends Vue {
  @Prop({default: TOP}) verticalAlign: string
  @Prop({default: LEFT}) horizontalAlign: string

  get translateY() {
    switch(this.verticalAlign){
      case TOP:
        return '0'
      case BOTTOM:
        return '0'
      case CENTER:
        return '-50%'
      // no default
    }
    return '0'
  }

  get translateX() {
    switch(this.horizontalAlign){
      case LEFT:
        return '0'
      case RIGHT:
        return '0'
      case CENTER:
        return '-50%'
      // no default
    }
    return '0'
  }

  get verticalPosition() {
    switch(this.verticalAlign){
      case TOP:
        return {top: '0'}
      case BOTTOM:
        return {bottom: '0'}
      case CENTER:
        return {top: '50%'}
      // no default
    }
    return {top: '0'}
  }

  get horizontalPosition() {
    switch(this.horizontalAlign){
      case LEFT:
        return {left: '0'}
      case RIGHT:
        return {right: '0'}
      case CENTER:
        return {left: '50%'}
      // no default
    }
    return {left: '0'}
  }

  get optionsStyles() {
    return {
      transform: `translate(${this.translateX},${this.translateY})`,
      ...this.horizontalPosition,
      ...this.verticalPosition,
    }
  }
}
</script>
<style scoped lang="stylus">
  .ew-div
    position absolute
    display block
</style>
