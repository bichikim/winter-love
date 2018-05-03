import LoadWorker from 'worker-loader!./load.worker'
import {ILoadClassOptions, IWorkers} from '~/preload/types'
import {isSupportWebworker} from '~/preload/util'
import load from './load'
const INIT_MAX_WORKER = 2

const workers: IWorkers = {
  default: [],
}

export default class Load {
  private _maxWorkers: number
  private _namespace?: string
  private _currentWorkerIndex: number = 0

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
