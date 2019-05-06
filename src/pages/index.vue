<template lang="pug">
  .main
    white-space {{text}}
    sm-container(:items="smData.items" :parent="smData")
    q-nested-dragable(:items="nest")
    q-block.block
    q-block.block2
</template>

<script lang="ts">
import WhiteSpace from '@/components/WhiteSpace.vue'
import SmContainer from '@/components/stateManagementPattern/SmContainer.vue'
import SmContent from '@/components/stateManagementPattern/SmContent.vue'
import QNestedDragable from '@/components/QNestedDragable.vue'
import QBlock from '@/components/Qblock.vue'
import {ItemData} from '@/components/stateManagementPattern/types'
import {
  Component, Vue, Prop,
} from '~/vue-ts'
import {Item} from '@/components/types/nested'

@Component({
  components: {WhiteSpace, SmContainer, SmContent, QNestedDragable, QBlock},
  layout: 'default',
})
export default class Index extends Vue {
  @Prop() test: string

  nest: Item[] = [
    {
      id: '0',
      name: 'item0',
    },
    {
      id: '1',
      name: 'item1',
      items: [
        {
          id: '2',
          name: 'item2',
        },
      ],
    },
  ]


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
  .block
    width 400px
    height 400px
    background-color red
  .block2
    width 300px
    height 300px
    background-color blue
</style>
