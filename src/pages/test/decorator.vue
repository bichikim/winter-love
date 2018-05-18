<template>
  <div class="main">
    <decorator-test/>
  </div>
</template>
<script>
  // import {mapActions, mapState} from 'vuex'
  import DecoratorTest from '@/components/DecoratorTest'
  export default {
    name: 'decorator-test-page',
    components: {DecoratorTest},
    props: {},
    data(){
      return {}
    },
    computed: {
      // ...mapState({
      //   app: (state) => (state.app),
      // }),
    },
    created(){},
    mounted(){},
    methods: {},
  }
</script>
<style scoped lang="stylus">
  .main
    position absolute
    width 100%
    height 100%
    top 0
    left 0

</style>
