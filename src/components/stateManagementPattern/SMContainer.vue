<template lang="pug">
  .main
    s-m-content {{content}}
    s-m-container(v-if="items" v-for="(item) in items" v-bind="item")
</template>

<script lang="ts">
import {
  Component, Prop, Mixins,
} from 'vue-property-decorator'
import ContainerMixin from './container.mixin'
import SMContent from './SMContent.vue'

@Component({
  components: {
    SMContainer,
    SMContent,
  },
})
export default class SMContainer extends Mixins(ContainerMixin) {

}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
