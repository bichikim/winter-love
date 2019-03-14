<template>
  <div>
    hi?
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from '~/vue-ts'

@Component({
  middleware: 'test',
})
export default class App extends Vue {
  @Prop() text: string
}
</script>

<style scoped lang="stylus">
</style>
