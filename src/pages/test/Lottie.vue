<template lang="pug">
  .lottie-page
    lottie(:animationData="example" :loop="loop")
</template>
<script lang="ts">
  import Lottie from '~/vue-lottie/Lottie.ts'
  import example from '~/vue-lottie/example.json'
  import {Component, Vue} from 'vue-property-decorator'
  @Component({
    components: {
      Lottie,
    }
  })
  export default class BodyMovinPage extends Vue {
    example: any = example

    loop: boolean = false

    created() {
      setInterval(() => {
        this.loop = !this.loop
      }, 10000)
    }
  }
</script>
<style scoped lang="stylus">
  .lottie-page
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
