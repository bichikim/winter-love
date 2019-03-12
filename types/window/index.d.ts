import Vue from 'vue'
/* tslint:disable:interface-name */
declare global {
  interface Window {
    process: NodeJS.Process
    Worker?: Worker
    preloadTest?: boolean
    webkitURL?: URL
    WebGLRenderingContext?: WebGLRenderingContext

    $nuxt: Vue

    onNuxtReady(callback: () => void): void
  }
}

declare interface URL {
  createObjectURL: (object: any) => string
}
