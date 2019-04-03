<template lang="pug">
  .main
    s-m-content {{content}}
    s-m-container(v-if="items" v-for="(item) in items" v-bind="item")
</template>

<script lang="ts">
import {
  Component, Prop, Mixins,
} from '@@/node_modules/vue-property-decorator'
import StateMixin from './state.mixin'
import SMContent from './SMContent.vue'
import SMContainer from './SMContainer.vue'
import ContainerMixin from './container.mixin'


import {Item} from './types'

@Component({
  components: {
    SMRoot,
    SMContent,
    SMContainer,
  },
})
export default class SMRoot extends Mixins(StateMixin, ContainerMixin) implements Item {
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
