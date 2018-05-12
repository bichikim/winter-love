<template lang="pug">
  .menu
    el-menu(
    class="el-menu"
    :default-active="activeIndex"
    :collapse="collapse"
    )
      template(v-for="(mainItem, mainKey) in menu")
        el-submenu(v-if="typeof mainItem === 'object'" :index="key")
          el-menu-item(v-for="(item, key) in mainItem" :key="key")
            i(v-if="Boolean(item)" :class="`el-icon-${item.icon}`")
            span {{item.name}}
        el-menu-item(v-else :index="mainKey" :key="mainKey")
          span(class="menu-item-name") {{mainItem.name}}
</template>
<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'

  @Component
  export default class  extends Vue {
    @Prop({default: 0}) activeIndex: number

    @Prop({default: false}) collapse: boolean

    @Prop({default: () => ([])}) menu: any[]

  }
</script>
<style scoped lang="stylus">
  .menu
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    .el-menu
      position absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      .menu-item-name
        display block
</style>
