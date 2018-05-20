<template lang="pug">
  .white-space(v-html="contentHtml")
</template>
<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'

  @Component
  export default class  extends Vue {
    @Prop() content: string

    get contentHtml() {
      const replace = (text) => {
        return text.replace(/(?:\r\n|\r|\n)/g, '<br />')
      }
      if(this.content){return replace(this.content)}
      let html = ''
      if(!this.$slots.default){return html}
      this.$slots.default.forEach((value) => {
        let content
        if(typeof value === 'string') {
          content = value
        }else if(typeof value === 'object'){
          content = value.text
        }else{
          return
        }
        if(!content){
          return
        }
        html += replace(content)
      })
      return html
    }
  }
</script>
<style scoped lang="stylus">
  .white-space
    display block
</style>
