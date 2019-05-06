<template lang="pug">
  q-layout(:view="view")
    q-header(elevated)
      q-toolbar(:glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'")
        q-btn(flat round dense @click='open = !open' aria-label="menu")
          q-icon(name="ion-menu")
        q-toolbar-title
          | Winter Love Project
        div() {{$q.version}}
    q-navigation(:items="items" @input="handleNav" v-model="open")
    q-page-container
      router-view

</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {NavItem} from '@/components/types/navigation'
import QNavigation from '@/components/QNavigation.vue'
const aside = namespace('aside')

@Component({
  components: {
    QNavigation,
  },
})
export default class Index extends Vue {
  @Prop({default: 'lHh Lpr fff'}) view: string
  @aside.State items: NavItem
  open: boolean = true
  version: string = 'version'

  handleNav(url) {
    console.log(url)
  }
}
</script>

<style scoped lang="stylus">
  .app
    display flex
</style>
