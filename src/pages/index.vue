<template lang="pug">
  .main
    white-space {{text}}
    sm-container(:items="smData.items" :parent="smData")
</template>

<script lang="ts">
import WhiteSpace from '@/components/WhiteSpace.vue'
import SmContainer from '@/components/stateManagementPattern/SmContainer.vue'
import SmContent from '@/components/stateManagementPattern/SmContent.vue'
import {ItemData} from '@/components/stateManagementPattern/types'
import uuid from 'uuid/v1'
import {
  Component, Vue, Prop,
} from '~/vue-ts'

@Component({
  components: {WhiteSpace, SmContainer, SmContent},
  layout: 'default',
})
export default class Index extends Vue {
  @Prop() test: string


  smData: ItemData = {
    items: [
      {
        content: {
          kind: 'label',
          value: 'foo',
        },
      },
      {
        content: {
          kind: 'input',
          value: 'bar',
        },
      },
      {
        items: [
          {
            content: {
              kind: 'label',
              value: 'foo',
            },
          },
          {
            content: {
              kind: 'input',
              value: 'bar',
            },
          },
        ],
      },
    ],
  }
  text: string = 'hi there? \n I am bryan'

  handleLongPress(say: string, event: MouseEvent) {
    console.log(say, 'yeah', event)
  }
}
</script>

<style scoped lang="stylus">
  .main
    display block
</style>
