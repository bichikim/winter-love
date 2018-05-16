<template lang="pug">
  .fullscreen
    button(@click="onToggleFullScreen") fullscreen
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {toggleFullScreen} from '~/full-screen'
  @Component
  export default class FullScreen extends Vue {
    onToggleFullScreen() {
      toggleFullScreen(!this.isFullScreen)
      this.isFullScreen = !this.isFullScreen
    }
  }
</script>
<style scoped lang="stylus">
  .fullscreen
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
