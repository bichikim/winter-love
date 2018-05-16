<template lang="pug">
  .white-space(v-html="contentHtml")
</template>
<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'

  @Component
  export default class  extends Vue {
    @Prop() content: string

    get contentHtml() {
      const first = this.$slots.default ? this.$slots.default[0] : {}
      const {text} = first || {}
      const content = this.content || text
      if(!content){
        return ''
      }
      return content.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
  }
</script>
<style scoped lang="stylus">
  .white-space
    display block
</style>
