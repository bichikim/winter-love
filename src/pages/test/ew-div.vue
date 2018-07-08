<template lang="pug">
  .test
    ew-div.ew-dev(verticalAlign="center" horizontalAlign="center" @click="click")
      div hi
    ew-div.ew-dev(verticalAlign="center" horizontalAlign="left")
    ew-div.ew-dev(verticalAlign="center" horizontalAlign="right")
    ew-div.ew-dev(verticalAlign="top" horizontalAlign="center")
    ew-div.ew-dev(verticalAlign="bottom" horizontalAlign="center")
</template>

<script lang="ts">
  import EwDiv from '~/element-wrapper/EwDiv.vue'
  import {Component, Vue} from 'vue-property-decorator'

  @Component({
    components: {
      EwDiv
    }
  })
  export default class TestEwDiv extends Vue {
    click(){
      console.log('click')
    }
  }
</script>

<style scoped lang="stylus">
  .test{
    .ew-div{
      width 200px
      height 200px
      background-color aqua
      border solid black 1px
    }
    position absolute
    width 100%
    height 100%
    display block
    background-color red
  }
</style>
