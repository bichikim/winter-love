<template lang="pug">
  .main
    white-space(v-eex @long-press="handleLongPress('default', $event)" ) {{text}}
    div(v-eex @long-press-vary-long="handleLongPress('vary long', $event)") new ! !!!!!!!!!!!
</template>

<script lang="ts">
import WhiteSpace from '@/components/WhiteSpace.vue'
import {
  Component, Vue, Prop,
} from '~/vue-ts'

@Component({
  components: {WhiteSpace},
  layout: 'default',
})
export default class Index extends Vue {
  @Prop() test: string

  text: string = 'hi there? \n I am bryan'

  handleLongPress(say: string, event: MouseEvent) {
    console.log(say, 'yeah', event)
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
    flex-direction column
    background-color red
</style>
