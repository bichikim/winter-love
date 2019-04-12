<template lang="pug">
  .main
    q-toolbar(color="primary")
    q-toolbar-title title
      q-btn(color="secondary" label="npm" icon="ion-heart")
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
    display block
</style>
