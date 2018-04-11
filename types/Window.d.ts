/* eslint-disable typescript/interface-name-prefix,typescript/no-namespace */
import Process = NodeJS.Process
/* tslint:disable-next-line: interface-name*/
declare interface Window {
  process: Process
  expect: any
  onNuxtReady(callback: () => void)
}
