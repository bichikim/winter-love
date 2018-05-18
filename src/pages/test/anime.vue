<template lang="pug">
  .anime-test hello
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Anime from '~/vue-anime/Anime'
  @Component({
    components: {
      Anime
    }
  })
  export default class AnimeTestPage extends Vue {
  }
</script>
<style scoped lang="stylus">
  .anime-test
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
