<template lang="pug">
  q-layout(view='lHh Lpr fff')
    q-header
      q-toolbar(:glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'")
        q-btn(flat='' round='' dense='' @click='drawerState = !drawerState' icon='ion-android-menu')
        q-toolbar-title
          | Quasar App - quasar-test2
          div(slot='subtitle') Running on Quasar v
    q-drawer(v-model='drawerState' :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null")
      q-list(no-border='' link='' inset-delimiter='')
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
  drawerState: boolean = true

  launch(url) {
    console.log(url)
  }
}
</script>

<style scoped lang="stylus">
  .app
    display flex
</style>
