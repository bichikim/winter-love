<template lang="pug">
  section.container
    .content
      app-logo
      .text
        h1.title Test Pad
        h2.subtitle Web testing send box
        .links
          a.button--green(href="https://nuxtjs.org/" target="_blank") Documentation
          a.button--grey(href="https://github.com/nuxt/nuxt.js" target="_blank") GitHub
        a(v-on="listeners") click!!
</template>

<script lang="ts">
  import AppLogo from '@/components/AppLogo.vue'
  import {Component, Vue} from 'nuxt-property-decorator'
  import {toggleFullScreen} from '~/full-screen'

  @Component({
    components: {
      AppLogo,
    },
    head () {
      return {
        meta: [

        ]
      }
    }
  })
  export default class IndexPage extends Vue {
    listeners: any = {
      click: () => {
        console.log('click test')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .container
    min-height 100vh
    display flex
    justify-content center
    align-items center
    text-align center
    .content
      width 100%
      height 100%
    .text
      width 100%
      height auto
      position absolute
      padding-bottom 10px
      bottom 0
  .title
    font-family "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif /* 1 */
    display block
    font-weight 300
    font-size 100px
    color #35495e
    letter-spacing 1px

  .subtitle
    font-weight 300
    font-size 42px
    color #526488
    word-spacing 5px
    padding-bottom 15px

  .links
    padding-top: 15px
</style>
