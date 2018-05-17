<template lang="pug">
  .request hello
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {Action as _Action, namespace} from 'vuex-class'
  const Action = namespace('api', _Action)
  @Component
  export default class Request extends Vue {
    @Action test: () => void

    mounted(){
      this.test()
    }
  }
</script>
<style scoped lang="stylus">
  .request
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
