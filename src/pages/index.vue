<template lang="pug">
  .main Vue
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator'


@Component({
  components: {},
  layout: 'default',
})
export default class Index extends Vue {
  @Prop() test: string
}
</script>

<style scoped lang="stylus">
  .main
    display block
  .block
    width 400px
    height 400px
    background-color red
  .block2
    width 300px
    height 300px
    background-color blue
</style>
