<template lang="pug">
  .white-space hello
    white-space {{contentText}}
    white-space(:content="contentText")
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  @Component
  export default class WhiteSpacePage extends Vue {
    contentText: string = 'hi?\nmy name is\n hahaha'
  }
</script>
<style scoped lang="stylus">
  .white-space
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
