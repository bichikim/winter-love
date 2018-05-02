import joinPath from 'join-path'
import {IDoneEvent} from '~/blob/IDoneEvent'
import {Load} from './load'

const loader = new Load()

interface IPreloadOptions {
  done?: (result: IDoneEvent) => any
  progress?: (result: ProgressEvent) => any
  src: string
  basePath?: string
}

/**
 *
 * @param {IPreloadOptions} request
 * @return {Promise<string>}
 */
export default (request: IPreloadOptions = {src: ''}): Promise<string> => {
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
