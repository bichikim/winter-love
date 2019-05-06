<template lang="pug">
  .block(dragable)
    .content
      slot
    .deco(v-if="isShowDeco" :style="decoStyle")
      slot
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import interact from 'interactjs'
import {Point} from './types/drag'
const DRAG_START = 'drag-start'
const DRAG_MOVE = 'drag-move'
const DRAG_END = 'drag-end'
const DROP = 'drop'
@Component
export default class QBlock extends Vue {
  static getPointFormEvent(event: any): Point {
    const target: HTMLDivElement = event.target
    if(!target){
      throw new Error('[QBlock] event has no target')
    }
    if(!target.offsetTop || !target.offsetLeft){
      throw new Error('[QBlock] event target has no offsetTop or offsetLeft')
    }
    return {
      x: target.offsetLeft,
      y: target.offsetTop,
    }
  }

  @Prop() data: any
  @Prop({default: Infinity}) max: number
  @Prop({default: true}) showMovement: boolean

  get isShowDeco() {
    return Boolean(this.originPosition && this.showMovement)
  }

  get decoStyle() {
    const {moveVector} = this
    if(moveVector){
      return {
        top: moveVector.x + 'px',
        left: moveVector.y + 'px',
      }
    }
    return {top: '0', left: '0'}
  }

  originPosition: Point | null = null
  moveVector: Point | null = null

  mounted() {
    this.initInteract(this.$el)
  }

  updated() {
    this.initInteract((this.$el))
  }

  startMove(point: Point) {
    this.moveVector = {x: 0, y: 0}
    this.originPosition = point
  }

  endMove(point: Point) {
    this.moveVector = null
    this.originPosition = null
  }

  initInteract(element: Element) {
    const {max, data} = this
    const myElement = interact(element)
    myElement.draggable({
      max,
    })
      .on('dragstart', (event) => {
        const point = QBlock.getPointFormEvent(event)
        this.startMove(QBlock.getPointFormEvent(event))
        this.$emit(DRAG_START, {
          data,
          point,
        })
      })
      .on('dragmove', (event) => {
        this.$emit(DRAG_MOVE, this.data, event)
      })
      .on('dragend', (event) => {
        const {originPosition} = this
        const originPoint = originPosition ? originPosition : {x: 0, y: 0}
        const point = QBlock.getPointFormEvent(event)
        this.endMove(point)
        this.$emit(DRAG_END, {
          data,
          point: {
            x: originPoint.x + point.x,
            y: originPoint.y + point.y,
          },
        })
      })

    myElement.dropzone({

    })
      .on('drop', (event) => {
        this.$emit(DROP, this.data,  event)
      })
  }
}
</script>

<style scoped lang="stylus">
  .block
    touch-action none
    user-select none
    position relative
  .deco
    position absolute
    width 100%
    height 100%
    border-color black
</style>
