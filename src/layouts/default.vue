<template lang="pug">
  q-layout(view='lHh Lpr fff')
    q-header(elevated)
      q-toolbar(:glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'")
        q-btn(flat round dense @click='leftDrawerOpen = !leftDrawerOpen' aria-label="menu")
          q-icon(name="ion-menu")
        q-toolbar-title
          | Winter Love Project
        div() {{$q.version}}
    q-navigation(:items="items")
    q-page-container
      router-view

</template>

<script lang="ts">
import {Component, Vue, namespace, State} from '~/vue-ts'
import {NavItem} from '~/types/navigation'
import QNavigation from '@/components/QNavigation.vue'
const aside = namespace('aside')

@Component({
  components: {
    QNavigation,
  },
})
export default class Index extends Vue {
  @aside.State items: NavItem
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
