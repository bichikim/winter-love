<template lang="pug">
  .winter-img-progress
</template>
<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'

  interface IImageOptions {
    width?: number
    height?: number
    title?: number
  }

  @Component
  export default class  extends Vue {
    @Prop({default: true}) allowLoadOrigin: boolean

    @Prop({default: 700}) transitionDuration: number

    @Prop({default: 100}) initWaitDuration: number

    @Prop({default: () => ({})}) imageOptions: object


  }
</script>
<style scoped lang="stylus">
  .winter-img-progress
</style>
