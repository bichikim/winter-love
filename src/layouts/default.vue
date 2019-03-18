<template lang="pug">
  .app
    div Layout
    router-view
</template>

<script lang="ts">
import {Component, Vue} from '~/vue-ts'

@Component
export default class Index extends Vue {
}
</script>

<style scoped lang="stylus">
  .app
    display flex
</style>
