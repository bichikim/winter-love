import {VNode, VNodeDirective} from '@@/node_modules/vue'
import {createEventName} from './create-event-name'

const DEFAULT_TRIGGER_TIMEOUT = 100
const DEFAULT_SWIPE_TOLERANCE = 30
const DEFAULT_CHECK_TIMEOUT = 100
const EV_SWIPE = 'long-press'

export interface SwipeSate {
  isTimeout?: boolean
  timeout?: any
  onPointerDown?: (event: PointerEvent) => void,
  onPointerUp?: (event: PointerEvent) => void,
  pointEvent?: PointerEvent,
  startPoint?: {x: number, y: number}
}

export interface Options {
  checkTimeout?: boolean
  triggerTimeout?: number
  swipeTolerance?: number
}

export const swipeSymbol = Symbol('swipe')

export interface SwipeHTMLElement extends HTMLElement {
  [swipeSymbol]?: {[key: string]: SwipeSate}
}

// todo working
export const swipe = (name: string, options: Options = {}) => {
  const eventName = createEventName(EV_SWIPE, name)
  return {
    bind(el: SwipeHTMLElement, binding: VNodeDirective, vnode: VNode) {
      const eventState: SwipeSate = {}

      let _options: Options = options

      if(typeof binding.value === 'object'){
        _options = {...binding.value, ..._options}
      }

      const {
        triggerTimeout = DEFAULT_TRIGGER_TIMEOUT,
        checkTimeout = DEFAULT_CHECK_TIMEOUT,
        swipeTolerance = DEFAULT_SWIPE_TOLERANCE,
      } = _options

      const onPointerUp = (event: PointerEvent) => {
        if(eventState.timeout){
          clearTimeout(eventState.timeout)
        }
        eventState.timeout = null
        document.removeEventListener('pointerup', onPointerUp)
        if(checkTimeout && eventState.isTimeout){
          return
        }
        console.log(eventState.startPoint)
        console.log({
          x: event.clientX,
          y: event.clientY,
        })
      }
      const onPointerDown = (event: PointerEvent) => {
        eventState.pointEvent = event
        eventState.startPoint = {
          x: event.clientX,
          y: event.clientY,
        }
        eventState.isTimeout = false
        document.addEventListener('pointerup', onPointerUp)
        eventState.pointEvent = event
        if(checkTimeout){
          eventState.timeout = setTimeout(() => {
            eventState.isTimeout = true
          }, triggerTimeout)
        }
      }

      el.addEventListener('pointerdown', onPointerDown)
    },
    unbind(el: SwipeHTMLElement) {
      // @ts-ignore
      const data = el[swipeSymbol][name]
      if(data){
        const {onPointerDown, onPointerUp} = data
        if(onPointerDown){
          el.removeEventListener('pointerdown', onPointerDown)
        }
        if(onPointerUp){
          document.removeEventListener('pointerup', onPointerUp)
        }
      }
    },
  }
}
