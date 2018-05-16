<template lang="pug">
  .inject-script
    inject-script(src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js") console.log('hi!?')
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  @Component
  export default class InjectScript extends Vue {
  }
</script>
<style scoped lang="stylus">
  .inject-script
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
