import lottie from 'lottie-web'
import {Component, Prop, Vue} from 'vue-property-decorator'
import {
  COMPLETE, CREATED, DATA_READY, DESTROY, DOM_LOADED,
  ENTER_FRAME, LOADED_IMAGES, LOOP_COMPLETE, SEGMENT_START,
} from './events'
import {shouldChange} from '~/vue-helper'

@Component
export default class Lottie extends Vue {
  @Prop() animationData: any
  @Prop({default: 'svg'}) renderer: string
  @Prop({default: false}) loop: boolean
  @Prop({default: true}) autoplay: boolean
  @Prop({default: () => ({})}) rendererSettings: object
  @Prop({default: true}) event: boolean
  @Prop({default: false}) extendEvent: boolean
  @Prop() controller: (controller) => void

  old: any = {}

  animation: any = null

  get watchingProps() {
    const {animationData, renderer, loop, autoplay, rendererSettings} = this
    return {animationData, renderer, loop, autoplay, rendererSettings}
  }

  get shouldUpdateAnimation() {
    const {animationData, renderer, loop, autoplay, rendererSettings} = this
    const {aniSetting} = this.old
    const change = shouldChange(this, aniSetting)
    if(change){
      this.old.aniSetting = {animationData, renderer, loop, autoplay, rendererSettings}
    }
    return change
  }

  initMovin() {
    if(!this.animationData){return}
    const container = this.$el
    if(!container){return}
    if(this.animation){
      this.animation.destroy()
    }
    const {renderer, loop, autoplay, animationData} = this
    const {rendererSettings} = this
    this.animation = lottie.loadAnimation({
      container, renderer, loop, autoplay, animationData,
      rendererSettings,
    })
    const {animation} = this
    this.$emit(CREATED, animation)
    if(this.event){
      animation.onComplete = () => (this.$emit(COMPLETE, animation))
      animation.onLoopComplete = () => (this.$emit(LOOP_COMPLETE, animation))
      animation.addEventListener('destroy', () => (this.$emit(DESTROY, animation)))
    }
    if(this.extendEvent){
      animation.onEnterFrame = () => (this.$emit(ENTER_FRAME, animation))
      animation.onSegmentStart = () => (this.$emit(SEGMENT_START, animation))
      animation.addEventListener('data_ready', () => (this.$emit(DATA_READY, animation)))
      animation.addEventListener('loaded_images', () => (this.$emit(LOADED_IMAGES, animation)))
      animation.addEventListener('DOMLoaded', () => (this.$emit(DOM_LOADED, animation)))
    }
    if(this.controller){
      this.controller(animation)
    }
  }

  beforeDestroy() {
    if(this.animation){
      this.animation.destroy()
    }
  }

  render(h) {
    if(this.shouldUpdateAnimation){
      this.$nextTick(() => {
        this.initMovin()
      })
    }
    return h('div')
  }
}
