<template lang="pug">
  s-m-label.s-m-content(v-if="kind === 'label'" :value="value")
  s-m-input.s-m-content(v-else-if="kind === 'input'" :value="value")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from '~/vue-ts'
import SMLabel from './SMLabel.vue'
import SMInput from './SMInput.vue'

@Component({
  components: {
    SMLabel,
    SMInput,
  },
})
export default class SMContent extends Vue {
  static DEFAULT_KIND = 'label'
  @Prop() value: string
  @Prop({default: SMContent.DEFAULT_KIND}) kind: string
}
</script>

<style scoped lang="stylus">
  .s-m-content
    display flex
</style>
