<template lang="pug">
  .require {{$assets.test}}}
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import test from './test.json'
  @Component
  export default class RequireTestPage extends Vue {
    require(){
      return {
        test,
      }
    }
  }
</script>
<style scoped lang="stylus">
  .require
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
