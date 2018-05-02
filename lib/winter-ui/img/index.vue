<template lang="pug">
  .winter-img
    img(:src="path", :atl="title", :title="title")
</template>
<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import joinPath from 'join-path'

  @Component
  export default class  extends Vue {
    @Prop src: string
    @Prop basePath: string

    // use @/asset instead of ./
    @Prop({default: false}) isFromAssets: boolean

    @Prop({default: '100%'}) width: number
    @Prop({default: '100%'}) height: number

    // description when the mouse is on this image
    @Prop({default: 'Image'}) title: number


    get path(){
      const {isFromAssets, basePath, src} = this
      return isFromAssets ? joinPath('@/assets', basePath, src) : joinPath(basePath, src)
    }
  }
</script>
<style scoped lang="stylus">
  .winter-img
</style>
