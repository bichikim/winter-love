<template lang="pug">
  label.s-m-label {{value}}
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class Label extends Vue {
  @Prop() value: string
}
</script>

<style scoped lang="stylus">
  .s-m-label
    display flex
</style>
