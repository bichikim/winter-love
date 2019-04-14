<template lang="pug">
  q-layout(view='lHh Lpr fff')
    q-header(elevated)
      q-toolbar(:glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'")
        q-btn(flat round dense @click='leftDrawerOpen = !leftDrawerOpen' aria-label="menu")
          q-icon(name="ion-menu")
        q-toolbar-title
          | Winter Love Project
        div() {{$q.version}}
    q-drawer(v-model='leftDrawerOpen' bordered)
      q-list()
        q-item-label(header) Essential Links
        q-item(@click.native="launch('http://quasar-framework.org')")
          q-item-section(avatar)
            q-icon(name='ion-university')
          q-item-section Docs
    q-page-container
      router-view

</template>

<script lang="ts">
import {Component, Vue} from '~/vue-ts'

@Component
export default class Index extends Vue {
  leftDrawerOpen: boolean = true
  version: string = 'version'

  launch(url) {
    console.log(url)
  }
}
</script>

<style scoped lang="stylus">
  .app
    display flex
</style>
