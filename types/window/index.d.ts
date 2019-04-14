/* tslint:disable:interface-name */
import Vue from 'vue'
declare global {
  interface QuasarConfig {
    primary: string,
  }

  declare interface Window {
    __vue: Vue
    quasarConfig: QuasarConfig
  }
}

declare interface URL {
  createObjectURL: (object: any) => string
}
