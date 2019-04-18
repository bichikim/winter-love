<template lang="pug">
  input.s-m-input(:value="value")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from '~/vue-ts'

@Component({
  components: {

  },
})
export default class SMInput extends Vue {
  @Prop() value: string
}
</script>

<style scoped lang="stylus">
  .s-m-input
    display flex
</style>
