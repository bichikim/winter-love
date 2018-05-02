import getBlobType from '../get-blob-type'
import {IDoneEvent} from '../IDoneEvent'
import {IHandlerOptions} from '../IHandlerOptions'

export default (
  url: string,
  options: IHandlerOptions = {},
): Promise<IDoneEvent> => {
  if(!XMLHttpRequest){
    throw new Error(
      '[url to blob] Browser has no XMLHttpRequest',
    )
  }
  const {done, error, progress, abort, load} = options
  const request = new XMLHttpRequest()
  const type = getBlobType(url)
  let resolve, reject
  request.responseType = 'arraybuffer'

  request.onloadend = (event: ProgressEvent) => {
    const payload: IDoneEvent = {
      ...event,
      result: new Blob(request.response, {type}),
    }
    if(done){
      done(payload)
    }
    resolve(payload)
  }

  request.onerror = (_error: any) => {
    if(error){
      error(_error)
    }
    reject(_error)
  }

  if(progress){
    request.onprogress = (event: ProgressEvent) => {
      progress(event)
    }
  }

  if(abort){
    request.onabort = (event: Event) => {
      abort(event)
    }
  }

  if(load){
    request.onload = (event: Event) => {
      load(event)
    }
  }

  request.open('GET', url, true)
  request.send()

  return new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
}
