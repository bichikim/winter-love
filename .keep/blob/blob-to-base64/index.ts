import {IDoneEvent} from '../IDoneEvent'
import {IHandlerOptions} from '../IHandlerOptions'

export default (
  blob: Blob,
  options: IHandlerOptions = {},
): Promise<IDoneEvent> => {
  if(!FileReader){
    throw new Error(
      '[blob to base64] Browser has no FileReader',
    )
  }
  const {done, error, progress, abort, load} = options
  const reader = new FileReader()
  let resolve, reject
  reader.readAsDataURL(blob)

  reader.onloadend = (event: ProgressEvent) => {
    const payload: IDoneEvent = {...event, result: reader.result}
    if(done){
      done(payload)
    }
    resolve(payload)
  }
  reader.onerror = (_error: any) => {
    if(error){
      error(_error)
    }
    reject(_error)
  }

  if(progress){
    reader.onprogress = (event: ProgressEvent) => {
      progress(event)
    }
  }

  if(abort){
    reader.onabort = (event: Event) => {
      abort(event)
    }
  }

  if(load){
    reader.onload = (event: Event) => {
      load(event)
    }
  }

  return new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
}
