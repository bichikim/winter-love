<template lang="pug">
  .three
</template>
<script lang="ts">
  import {Component, Vue, Watch, Prop} from 'vue-property-decorator'
  import Three, {
    PerspectiveCamera,
    Scene,
    Geometry,
    WebGLRenderer,
    CanvasRenderer,
    Light,
    Mesh,
  } from 'three'
  import getRenderer from './getRenderer'

  @Component
  export default class Default extends Vue {
    @Prop() fov: number = 70
    @Prop() near: number = 0.01
    @Prop() far: number = 10
    @Prop() antialias: boolean = true
    @Prop() light: Light[] | Light = []
    @Prop() mash: Mesh[] | Mesh = []

    @Watch('fov') onFov(fov) {
      this.camera.fov = fov
    }

    @Watch('near') onNear(near) {
      this.camera.near = near
    }

    @Watch('far') onFar(far) {
      this.camera.far = far
    }

    @Watch('light') onLight(light, oldLight) {
      this.scene.remove(oldLight)
      this.scene.add(light)
    }

    @Watch('mash') onMash(mesh, oldMesh) {
      this.scene.remove(oldMesh)
      this.scene.add(mesh)
    }

    camera: PerspectiveCamera
    scene: Scene
    renderer: WebGLRenderer | CanvasRenderer

    get aspect() {
      return this.docWidth / this.docHeight
    }

    get docWidth() {
      return this.$el.clientWidth
    }

    get docHeight() {
      return this.$el.clientHeight
    }


    onDocResize() {
      this.camera.aspect = this.aspect
      this.renderer.setSize(this.docWidth, this.docHeight)
    }

    init() {
      const {
        fov, near, far, boxGeometry, aspect, antialias, docWidth, docHeight,
        transparent,
      } = this
      const $el: any = this.$el
      this.camera = new Three.PerspectiveCamera(fov, aspect, near, far)
      this.scene = new Three.Scene()
      this.renderer = getRenderer({antialias, alpha: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(docWidth, docHeight)
      $el.appendChild(this.renderer.domElement)
      $el.three = {
        scene: this.scene,
      }
      Object.freeze($el.three)
      if(window){
        window.removeEventListener('resize', this.onDocResize)
        window.addEventListener('resize', this.onDocResize)
      }
    }

    mounted() {
      this.init()
    }

    beforeDestroy() {
      if(window){
        window.removeEventListener('resize', this.onDocResize)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .three
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
