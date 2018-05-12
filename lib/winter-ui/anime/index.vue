<template lang="pug">
  .winter-anime
    div
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
  import anime from 'animejs'

  @Component
  export default class  extends Vue {
    // animation rail run animation head ~ last
    @Prop({default: () => ([])}) rail: any[]

    @Prop() init: any

    get currentProps() {
      const {rail, init} = this

      return {rail, init}
    }


    @Watch('currentRail', {immediate: false}) onProps(props) {
      const {rail, init} = props
      anime.timeline({
        ...init,
        targets: this.$el,
      }).add(rail)
    }

    mounted() {
      anime.timeline({
        ...this.init,
        targets: this.$el,
      }).add(this.rail)
    }
  }
</script>
<style scoped lang="stylus">
  .winter-anime
    height 100%
    width 100%
</style>
