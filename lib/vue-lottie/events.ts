const namespaceName = 'lottie'
const namespace = (event: string): string => {
  return `${namespaceName}/${event}`
}

export const COMPLETE = namespace('complete')
export const LOOP_COMPLETE = namespace('loop-complete')
export const CREATED = namespace('created')
export const ENTER_FRAME = namespace('enter-frame')
export const SEGMENT_START = namespace('segment-start')
export const DATA_READY = namespace('data-ready')
export const LOADED_IMAGES = namespace('loaded-images')
export const DOM_LOADED = namespace('dom-loaded')
export const DESTROY = namespace('destroy')
