<template lang="pug">
  .layout
    div layout
    router-view
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
const aside = namespace('aside')

@Component
export default class Index extends Vue {
  @Prop({default: 'lHh Lpr fff'}) view: string
  @aside.State items: any
  open: boolean = true
  version: string = 'version'
}
</script>

<style scoped lang="stylus">
  .app
    display flex
</style>
