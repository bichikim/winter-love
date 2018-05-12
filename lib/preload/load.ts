import uuid from 'uuid'
import LoadWorker from 'worker-loader!./load.worker'
import imageRequest from './image-request'
import {ILoadOptions} from './types'
import {isSupportWebworker} from './util'

const load = (options: ILoadOptions = {}) => {
  const {
    url,
    done,
    progress,
    terminateAfterDone = true,
  } = options
  let {worker} = options
  if(!isSupportWebworker()){
    if(process.env.NODE_ENV !== 'production'){
      console.warn(
        '[preload] this browser do not support Webworker' +
        ' this will affect ui animation speed',
      )
    }
    imageRequest({url, progress, done})
    return
  }
  if(!worker){
    worker = new LoadWorker()
  }
  let resolve
  const id = uuid.v1()
  worker.postMessage({url, id})
  worker.addEventListener('message', (event) => {
    const {data} = event
    if(url !== data.url || id !== data.id){return}
    if(event.data.status === 'progress' && progress){
      progress(data)
    }
    if(event.data.status === 'done'){
      if(terminateAfterDone){
        worker.terminate()
      }
      if(!done){
        resolve(data)
        return
      }
      if(typeof done === 'function'){
        done(data)
      }
    }
  })
  if(!done){
    return new Promise((_resolve) => {
      resolve = _resolve
    })
  }
}

export default load
