export interface ILoadRequestData{
  src?: string
  basePath?: string
  progress?: any
  done?: any
  isResponseBase64?: boolean
}

export interface ILoadOptions extends IImageRequestOptions{
  worker?: Worker
  terminateAfterDone?: boolean
}

export interface IImageRequestOptions {
  url?: string
  done?: TImageRequestCallback
  progress?: TImageRequestCallback
}

export interface ILoadClassOptions {
  namespace?: string
  workers?: number
}

export interface IWorkers {
  [name: string]: Worker[]
}

export interface IResult {
  url: string
  loaded: number
  total: number
  response?: Blob
}

export type TImageRequestCallback = (data: IResult) => void
