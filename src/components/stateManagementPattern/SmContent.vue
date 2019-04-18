<template lang="pug">
  sm-label.sm-content(v-if="kind === 'label'" :value="value")
  sm-input.sm-content(v-else-if="kind === 'input'" :value="value")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from '~/vue-ts'
import SmLabel from './SmLabel.vue'
import SmInput from './SmInput.vue'

@Component({
  components: {
    SmInput,
    SmLabel,
  },
})
export default class SmContent extends Vue {
  static DEFAULT_KIND = 'label'
  @Prop() value: string
  @Prop({default: SmContent.DEFAULT_KIND}) kind: string
}
</script>

<style scoped lang="stylus">
  .sm-content
    display flex
</style>
