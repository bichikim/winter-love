<template lang="pug">
  .app
    div App
    router-view
</template>

<script lang="ts">
import {Component, Vue, Prop} from '~/vue-ts'

@Component
export default class App extends Vue {
  @Prop() test: string
}
</script>

<style scoped lang="stylus">
  .app
    display block
</style>
