<template lang="pug">
  .love-icon
    lottie(class="lottie" :animationData="lottieHeat" loop)
</template>
<script>
  import lottieHeat from '@/assets/lottie/heart'
  export default {
    data(){
      return {
        lottieHeat
      }
    }
  }
</script>
<style scoped lang="stylus">
  .love-icon
    display block
    width 100%
    height 100%
    .lottie
      display inline-block
      max-width 1024px
      max-height 1024px
      width 100%
      height 100%
</style>
