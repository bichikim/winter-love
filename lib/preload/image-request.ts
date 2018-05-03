import {last} from 'lodash'
import {IImageRequestOptions} from './types'
export default (options: IImageRequestOptions = {}) => {
  const {url, progress, done} = options
  let type
  const extension = last(url.split('.'))
  switch(extension){
    case 'jpg':
      type = 'image/jpg'
      break
    case 'png':
      type = 'image/png'
      break
    default:
      type = 'application/xml'
  }

  const req = new XMLHttpRequest()
  req.responseType = 'arraybuffer'
  req.onprogress = (event) => {
    if(!progress){return}
    const {loaded, total} = event
    progress({
      url,
      loaded,
      total,
    })
  }
  req.onload = (event) => {
    if(!done){return}
    const {loaded, total} = event as any
    const {target: {response}} = event as any
    done({
      url,
      loaded,
      total,
      response: new Blob([response], {type}),
    })
  }
  req.open('GET', url, true)
  req.send()
}
