<template lang="pug">
  .block(dragable)
    slot
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import interact from 'interactjs'
const DRAG_START = 'drag-start'
const DRAG_MOVE = 'drag-move'
const DRAG_END = 'drag-end'
const DROP = 'drop'
@Component
export default class QBlock extends Vue {
  mounted() {
    this.initInteract(this.$el)
  }

  updated() {
    this.initInteract((this.$el))
  }

  initInteract(element: Element) {
    const myElement = interact(element)
    myElement.draggable({
      ondrageenter: (event) => {
        this.$emit(DRAG_START, event)
      },
      move: true,
      end: true,
    })
      // .on('dragmove', (event) => {
      //   this.$emit(DRAG_MOVE, event)
      // })
      // .on('dragstart', (event) => {
      //   this.$emit(DRAG_START, event)
      // })
      // .on('dragend', (event) => {
      //   this.$emit(DRAG_END, event)
      // })
    myElement.dropzone({
      onDrop: true,
    })
      .on('dropactivate', (event) => {
        this.$emit(DROP, event)
      })
  }
}
</script>

<style scoped lang="stylus">
  .block
    touch-action none
    user-select none
</style>
