import lottie from 'lottie-web'
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {
  COMPLETE, CREATED, DATA_READY, DESTROY, DOM_LOADED,
  ENTER_FRAME, LOADED_IMAGES, LOOP_COMPLETE, SEGMENT_START,
} from './events'
function shouldChange(compare, _origin) {
  const origin = _origin || this
  if(!origin || !compare){return true}
  const change = Object.keys(compare).find((key) => {
    return origin[key] !== compare[key]
  })
  return typeof change !== 'undefined'
}

@Component
export default class Lottie extends Vue {
  @Prop() animationData: any
  @Prop({default: 'svg'}) renderer: string
  @Prop({default: false}) loop: boolean
  @Prop({default: true}) autoplay: boolean
  @Prop({default: false}) progressiveLoad: boolean
  @Prop({default: true}) hideOnTransparent: boolean
  @Prop({default: false}) clearCanvas: boolean
  @Prop({default: 1}) speed: number
  @Prop({default: true}) event: boolean
  @Prop({default: false}) extendEvent: boolean

  @Watch('speed') onSpeed(speed: number) {
    this.$nextTick(() => {
      this.animation.setSpeed(speed)
    })
  }

  old: any = {}

  animation: any = null

  get shouldUpdateAnimation() {
    const {
      animationData, renderer, loop, autoplay,
      progressiveLoad, hideOnTransparent, clearCanvas,
    } = this
    const {aniSetting} = this.old
    const change = shouldChange(this, aniSetting)
    if(change){
      this.old.aniSetting = {
        animationData, renderer, loop, autoplay, progressiveLoad, hideOnTransparent, clearCanvas,
      }
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
    const {progressiveLoad, hideOnTransparent, clearCanvas} = this
    this.animation = lottie.loadAnimation({
      container, renderer, loop, autoplay, animationData,
      rendererSettings: {
        progressiveLoad, hideOnTransparent, clearCanvas,
      },
    })
    const {animation} = this
    animation.setSpeed(this.speed)
    this.$emit(CREATED, animation)
    if(this.event){
      animation.onComplete = (event) => (this.$emit(COMPLETE, event))
      animation.onLoopComplete = (event) => (this.$emit(LOOP_COMPLETE, event))
      animation.onSegmentStart = (event) => (this.$emit(SEGMENT_START, event))
      animation.addEventListener('data_ready', (event) => (this.$emit(DATA_READY, event)))
      animation.addEventListener('loaded_images', (event) => (this.$emit(LOADED_IMAGES, event)))
      animation.addEventListener('DOMLoaded', (event) => (this.$emit(DOM_LOADED, event)))
    }
    if(this.extendEvent){
      animation.onEnterFrame = (event) => (this.$emit(ENTER_FRAME, event))
    }
  }

  beforeDestroy() {
    if(this.animation){
      this.animation.destroy()
      this.$emit(DESTROY)
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
