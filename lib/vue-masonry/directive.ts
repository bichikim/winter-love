import {camelCase, mapKeys} from 'lodash'
import {IOptions} from './'
import Masonry from 'masonry-layout'
const sMasonry = Symbol('masonry')

export default (options: IOptions) => {
  const {
    itemSelector = '.item',
    columnWidth = '.item',
    gutter = 0,
    horizontalOrder = true,
    percentPosition = true,
    stamp = '.stamp',
    // fitWidth //
    originLeft = true,
    originTop = true,
    containerStyle = null,
    transitionDuration = 0,
    // stagger //
    resize = true,
    initLayout = true,
  } = options
  return {
    bind(el, binding, vNode) {
      const masonryOptions = {
        itemSelector,
        columnWidth,
        gutter,
        horizontalOrder,
        percentPosition,
        stamp,
        originLeft,
        originTop,
        containerStyle,
        transitionDuration,
        resize,
        initLayout,
      }
      const {data: {attrs = {}}} = vNode
      Object.assign(
        masonryOptions,
        mapKeys(attrs, (value, key) => (camelCase(key))),
      )
      el[sMasonry] =  new Masonry(el, masonryOptions)
    },
    update(el) {
      const masonry = el[sMasonry]
      if(masonry){
        masonry.reloadItems()
        masonry.layout()
      }
    },
    unbind(el) {
      const masonry = el[sMasonry]
      if(masonry){
        masonry.destroy()
        delete el[sMasonry]
      }
    },
  }
}
