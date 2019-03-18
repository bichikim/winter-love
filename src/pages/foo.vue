<template lang="pug">
  .main
    div foo
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-ts'

@Component({
  layout: 'default',
  middleware: 'authenticated',
})
export default class Index extends Vue {
  @Prop() test: string
}
</script>

<style scoped lang="stylus">
  .main
    display flex
    background-color red
</style>
