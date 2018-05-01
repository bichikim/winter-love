import uuid from 'uuid'
import LoadWorker from 'worker-loader!./load.worker'
import imageRequest from './image-request'
import {ILoadClassOptions, ILoadOptions, IWorkers} from './types'

const INIT_MAX_WORKER = 2

const workers: IWorkers = {
  default: [],
}

export const isSupportWebworker = () => {
  return Boolean(window.Worker)
}

const load = (options: ILoadOptions = {}) => {
  const {
    url,
    done,
    progress,
    terminateAfterDone = true,
  } = options
  let {worker} = options
  if(!isSupportWebworker() || window.preloadTest){
    console.warn(
      '[preload] this browser do not support Webworker' +
      ' this will affect ui animation speed',
    )
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

export class Load {
  private _maxWorkers: number
  private _namespace?: string
  private _currentWorkerCount: number = 0
  private _currentWorkerIndex: number = 0
  private _works: any[] = []
  private _blobs: {[name: string]: any} = {}

  constructor(options: ILoadClassOptions = {}) {
    const {namespace, workers = INIT_MAX_WORKER} = options
    this._maxWorkers = workers
    if(namespace){
      if(!workers[namespace]){
        workers[namespace] = []
      }
    }
    this._namespace = namespace
  }

  get namespace() {
    const {_namespace} = this
    if(!_namespace){
      return workers.default
    }
    return workers[_namespace]
  }

  get(options: any = {}) {
    const {url, done, progress} = options
    const {namespace, _maxWorkers} = this
    let worker: Worker
    const _load = (url, progress, done) => {
      load({
        worker,
        url,
        terminateAfterDone: false,
        progress,
        done,
      })
    }
    if(!isSupportWebworker() || window.preloadTest){
      _load(url, progress, done)
      return
    }
    if(namespace.length < _maxWorkers){
      worker = new LoadWorker()
      namespace.push(worker)
    }else{
      let nextIndex = this._currentWorkerIndex + 1
      if(nextIndex >= _maxWorkers){
        nextIndex = 0
      }
      worker = namespace[nextIndex]
      this._currentWorkerIndex = nextIndex
    }
    _load(url, progress, done)
  }
}

export default load
