<template lang="pug">
  .deco hello
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from '~/vue-class-decorator/decorators/Component'
  @Component
  export default class DecoratorTest extends Vue {

  }
</script>
<style scoped lang="stylus">
  .deco
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
