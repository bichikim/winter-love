<template lang="pug">
  q-drawer(v-model="open" v-bind="{bordered}")
    q-scroll-area.fit.q-pa-sm
      q-list
        template(v-for="(item) in items")
          q-dynamic-item(:item="item")
</template>
<script lang="ts">
import {Component, Vue, Prop} from '~/vue-ts'
import {NavItem} from '~/types/navigation'
import QDynamicItem from './QDynamicItem.vue'

@Component({
  components: {
    QDynamicItem,
  },
})
export default class Navigation extends Vue {

  @Prop() items: NavItem[]
  @Prop() bordered: boolean

  open: boolean = true
}

</script>
