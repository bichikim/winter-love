/* eslint-disable typescript/interface-name-prefix,typescript/no-namespace */
import Process = NodeJS.Process
/* tslint:disable-next-line: interface-name*/
declare interface Window {
  process: Process
  expect: any
  Worker?: Worker
  preloadTest?: boolean
  webkitURL?: URL
  onNuxtReady(callback: () => void)
}

declare interface URL {
  createObjectURL: (object: any) => string
}
