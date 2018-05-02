<template lang="pug">
  .winter-anime
</template>
<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
  import anime from 'anime'
  @Component
  export default class  extends Vue {
    // animation rail run animation head ~ last
    @Prop rail: any[]

    @Prop init: any

    get currentProps() {
      const {rail, init} = this

      return {rail, init}
    }


    @Watch('currentRail', {immediate: false}) onProps(props){
      const {rail, init} = props
      anime.timeline({
        ...init,
        targets: this.$el,
      }).add(rail)
    }

    mounted(){
      anime.timeline({
        ...this.init,
        targets: this.$el,
      }).add(this.rail)
    }
  }
</script>
<style scoped lang="stylus">
  .winter-anime
</style>
