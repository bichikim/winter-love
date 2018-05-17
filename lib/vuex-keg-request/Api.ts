import axios from 'axios'
import joinPath from 'join-path'
import URL from 'url'
import IPathInfo from './IPathInfo'
import PathCollection, {IPathCollection} from './PathCollection'
interface IRequest {
  pathname?: string
  data?: {[name: string]: any}
  headers?: {[name: string]: any}
  paths?: {[name: string]: string}
}

interface IResult {
  [name: string]: any
}

export interface IApi {
  pathInfo: IPathCollection
  request(payload: IRequest): Promise<IResult>
}

export const GET = 'GET'
export const POST = 'POST'

export default class Api implements IApi {
  private readonly _pathInfo: IPathCollection

  constructor(pathInfo: IPathInfo) {
    this._pathInfo = new PathCollection(pathInfo)
  }

  get pathInfo(): IPathCollection {
    return this._pathInfo
  }

  request(payload: IRequest): Promise<IResult> {
    const {pathname, data: _data = {}, paths = {}, headers} = payload
    const {
      path: _path = '/', url: _url, protocol, hostname, basePath, port, inject,
      method = GET, request, result, error, autoSuccess, autoError,
    } = this.pathInfo.get(pathname)
    // define path
    let path = _path
    if(typeof _path === 'function'){path = _path(paths)}
    else if(Array.isArray(_path)){path = joinPath(_path)}

    // define url
    let url = _url || URL.format({protocol, hostname, port})
    url = joinPath(url, basePath, path)

    // init request data
    const requestData: any = {method, url}

    // define data
    let data = request? request(_data) : _data
    if(inject && inject.data){data = {...inject.data, ...data}}
    if(method === GET){requestData.params = {...data}}
    else{requestData.data = {...data}}

    // define headers
    if(headers){
      if(inject && inject.headers){requestData.headers = {...inject.headers, ...headers}}
      requestData.headers = {...headers}
    }

    return new Promise<IResult>((resolve, reject) => {
      axios(requestData).then((_result) => {
        const {data, ...others} = _result
        const otherData = {...others, call: autoSuccess}
        if(result){
          resolve({data: result(data), ...otherData})
          return
        }
        resolve({data, ...otherData})
      }).catch((_error) => {
        if(error){
          reject({...error(_error), call: autoError})
        }
        reject({..._error, call: autoError})
      })
    })
  }
}
