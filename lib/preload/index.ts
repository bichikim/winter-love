import joinPath from 'join-path'
import {Load} from './load'
import {ILoadRequestData} from './types'

const loader = new Load()
export default (request: ILoadRequestData = {}): Promise<string> => {
  const {
    done,
    basePath,
    progress,
    src = '',
  } = request
  const url: string = basePath ? joinPath(basePath, src) : src
  return new Promise((resolve) => {
    loader.get({
      url,
      progress: (result) => {
        if(progress){
          progress(result)
        }
      },
      done: (result) => {
        if(done){
          done(result)
        }
        resolve(result)
      },
    })
  })
}
