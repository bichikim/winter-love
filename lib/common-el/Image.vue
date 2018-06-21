<template lang="pug">
  .winter-img
    img(:src="path", :atl="title", :title="title")
</template>
<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import joinPath from 'join-path'

  @Component
  export default class ElImage extends Vue {
    @Prop src: string
    @Prop basePath: string
    @Prop ({default: '@assets'})assetsPath: string

    // use @/asset instead of ./
    @Prop({default: false}) isFromAssets: boolean

    @Prop({default: '100%'}) width: number | string
    @Prop({default: '100%'}) height: number | string

    // description when the mouse is on this image
    @Prop({default: 'Image'}) title: number

    get path() {
      return this.isFromAssets ?
        joinPath(this.assetsPath, this.basePath, this.src) :
        joinPath(this.basePath, this.src)
    }
  }
</script>
<style scoped lang="stylus">
  .winter-img
</style>
