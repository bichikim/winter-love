<template lang="pug">
  .app
    router-view
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop() test: string
}

</script>

<style scoped lang="stylus">
  .app
    display block
</style>
