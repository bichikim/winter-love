import joinPath from 'join-path'
import Load from './load-class'
import {ILoadRequestData} from './types'

const loader = new Load()
const URL = window.URL || window.webkitURL
export default (request: ILoadRequestData = {}): Promise<string> => {
  const {
    done,
    basePath,
    progress,
    src = '',
    isBlob = false,
  } = request
  const url: string = basePath ? joinPath(basePath, src) : src
  if(isBlob){
    return new Promise((resolve) => {
      loader.get({
        url,
        progress: (result) => {
          if(progress){
            progress(result)
          }
        },
        done: (result) => {
          const _result = URL.createObjectURL(result)
          if(done){
            done(_result)
          }
          resolve(_result)
        },
      })
    })
  }
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => {
      if(done){
        done({
          response: url,
        })
      }
      resolve(url)
    }
    image.src = joinPath(url)
  })
}
