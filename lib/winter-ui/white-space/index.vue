<template lang="pug">
  .new-line(v-html="contentHtml")
</template>
<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'

  @Component
  export default class  extends Vue {
    @Prop content: string

    get contentHtml() {
      return this.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
  }
</script>
<style scoped lang="stylus">
  .new-line
</style>
