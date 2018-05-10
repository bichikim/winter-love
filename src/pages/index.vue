<template lang="pug">
  section.container
    div
      app-logo
      h1.title Test Pad
      h2.subtitle Web testing send box
      .links
        a.button--green(href="https://nuxtjs.org/" target="_blank") Documentation
        a.button--grey(href="https://github.com/nuxt/nuxt.js" target="_blank") GitHub
        a.buuton--grey(@click="onToggleFullScreen") FullScreen
      div
        adsense(data-ad-client="ca-pub-XXXXXXXXXXXXXXXX", data-ad-slot="1234567890")
</template>

<script lang="ts">
  /* eslint-disable max-len,max-len */

  import AppLogo from '@/components/AppLogo.vue'
  import {Component, Vue} from 'vue-property-decorator'
  import {toggleFullScreen} from '~/full-screen'
  @Component({
    components: {
      AppLogo,
    },
  })
  export default class Index extends Vue {
    isFullScreen: boolean = false

    onToggleFullScreen() {
      toggleFullScreen(!this.isFullScreen)
      this.isFullScreen = !this.isFullScreen
    }
    created(){

    }
  }
</script>

<style>
  canvas{
    // background-color: #47494e;
  }
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
