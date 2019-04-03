<template lang="pug">
  .main
    slot
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from '~/vue-ts'

@Component
export default class SMContent extends Vue {

}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
