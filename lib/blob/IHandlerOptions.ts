import {IDoneEvent} from './IDoneEvent'

export interface IHandlerOptions {
  load?: (event: Event) => any
  done?: (event: IDoneEvent) => any
  start?: (event: ProgressEvent) => any
  abort?: (event: Event) => any
  error?: (error: any) => any
  progress?: (event: ProgressEvent) => any
}
