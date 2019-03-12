<template>
  <div>
    hi?
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop() text: string
}
</script>

<style scoped lang="stylus">
</style>
