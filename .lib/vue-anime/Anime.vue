<template lang="pug">
  .anime
    div
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
  import anime from 'animejs'

  @Component
  export default class Anime extends Vue {
    // animation rail run animation head ~ last
    @Prop({default: (): any[] => ([])}) rail: any[]

    @Prop() init: any

    get currentProps() {
      const {rail, init} = this

      return {rail, init}
    }


    @Watch('currentRail', {immediate: false}) onProps(props: any) {
      const {rail, init} = props
      anime.timeline({
        ...init,
        targets: this.$el,
      } as any).add(rail)
    }

    mounted() {
      anime.timeline({
        ...this.init,
        targets: this.$el,
      } as any).add(this.rail as any)
    }
  }
</script>
<style scoped lang="stylus">
  .anime
    display block
</style>
