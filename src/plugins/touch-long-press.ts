import {VNode, VNodeDirective} from 'vue/types/vnode'
import {eventNameFactory} from './touch'
const DEFAULT_LONG_PRESS_TIME_INTERVAL = 400
const EV_LONG_PRESS = 'long-press'

export interface LongPressState {
  timeout?: any,
  onPointerDown?: (event: PointerEvent) => void,
  onPointerUp?: () => void,
  onPointerMove?: (event: PointerEvent) => void,
  pointEvent?: PointerEvent,
}

export const longPressSymbol = Symbol('long-press')

export interface LongPressHTMLElement extends HTMLElement {
  [longPressSymbol]?: {[key: string]: LongPressState}
}

export interface Options {
  timeInterval?: number
}

const copyPointEvent = (event: PointerEvent, newName, el: LongPressHTMLElement): PointerEvent => {
  return new PointerEvent(newName, {
    altKey: event.altKey,
    bubbles: event.bubbles,
    button: event.button,
    cancelable: event.cancelable,
    clientX: event.clientX,
    clientY: event.clientY,
    ctrlKey: event.ctrlKey,
    composed: event.composed,
    detail: event.detail,
    height: event.height,
    isPrimary: event.isPrimary,
    metaKey: event.metaKey,
    pointerId: event.pointerId,
    pointerType: event.pointerType,
    pressure: event.pressure,
    relatedTarget: el,
    screenX: event.screenX,
    screenY: event.screenY,
    shiftKey: event.shiftKey,
    tangentialPressure: event.tangentialPressure,
    tiltX: event.tiltX,
    tiltY: event.tiltY,
    twist: event.twist,
    view: event.view,
    width: event.width,
  })
}

export const longPress = (name: string, options: Options = {}) => {
  const eventName = eventNameFactory(EV_LONG_PRESS, name)
  return {
    bind(el: LongPressHTMLElement, binding: VNodeDirective, vnode: VNode) {
      if(!el[longPressSymbol]){
        el[longPressSymbol] = {}
      }
      // do not run if node does not want to run
      if(binding.value === false){
        return
      }

      let _options: Options = options

      if(typeof binding.value === 'object'){
        _options = {...binding.value, ..._options}
      }

      const eventState: LongPressState = {}

      const onPointerUp = () => {
        if(eventState.timeout){
          clearTimeout(eventState.timeout)
        }
        eventState.timeout = null
        document.removeEventListener('pointerup', onPointerUp)
        el.removeEventListener('pointermove', onPointerMove)
        el.removeEventListener('pointerleave', onPointerUp)
      }

      const onPointerMove = (event: PointerEvent) => {
        eventState.pointEvent = event
      }

      const onPointerDown = (event: PointerEvent) => {
        const {timeInterval = DEFAULT_LONG_PRESS_TIME_INTERVAL} = _options
        document.addEventListener('pointerup', onPointerUp)
        el.addEventListener('pointermove', onPointerMove)
        el.addEventListener('pointerleave', onPointerUp)
        eventState.pointEvent = event
        eventState.timeout = setTimeout(() => {
          const pointEvent = eventState.pointEvent || event
          const longPressEvent = copyPointEvent(pointEvent, eventName, el)
          onPointerUp()
          // run handle
          if(vnode.componentInstance){
            vnode.componentInstance.$emit(eventName, longPressEvent)
          }else{
            el.dispatchEvent(longPressEvent)
          }
        }, timeInterval)
      }

      eventState.onPointerUp = onPointerUp
      eventState.onPointerDown = onPointerDown
      eventState.onPointerMove = onPointerMove
      // @ts-ignore
      el[longPressSymbol][name] = eventState
      el.addEventListener('pointerdown', onPointerDown)
    },
    unbind(el: LongPressHTMLElement) {
      // @ts-ignore
      const longPress = el[longPressSymbol] && el[longPressSymbol][name]
      if(longPress){
        const {onPointerDown, onPointerUp, onPointerMove} = longPress
        if(onPointerDown){
          el.removeEventListener('pointerdown', onPointerDown)
        }
        if(onPointerMove){
          el.removeEventListener('pointermove', onPointerMove)
        }
        if(onPointerUp){
          document.removeEventListener('pointerup', onPointerUp)
          el.removeEventListener('pointerleave', onPointerUp)
        }
      }
    },
  }
}
