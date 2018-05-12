<template lang="pug">
  . hello
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  @Component
  export default class  extends Vue {
  }
</script>
<style scoped lang="stylus">
  .main
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
