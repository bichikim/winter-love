<template lang="pug">
  .main
    div Index
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from '~/vue-ts'

@Component({
  layout: 'default',
})
export default class Index extends Vue {
  @Prop() test: string
}
</script>

<style scoped lang="stylus">
  .main
    display flex
    background-color red
</style>
