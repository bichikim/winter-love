import {last} from 'lodash'
import Api, {IApi} from './Api'
import IPathInfo from './IPathInfo'

interface IOptions{
  api?: IApi
  pathInfo?: IPathInfo
}

export function request(requestData: any): Promise<any> {
  const {api, ...others} = requestData
  return api.request(others)
}

function contextCall(data, type, name, context) {
  switch(name){
    case 'mutation':
      context.commit(`${type}Success`, data)
      break
    case 'action':
      context.dispatch(`${type}Success`, data)
    // no default
  }
}

export default function kegRequest(options: IOptions = {}) {
  const {api: _api, pathInfo} = options
  const api: IApi = _api || new Api(pathInfo)
  return () => (context) => (_pathname, _data, _paths, _headers, _api: IApi) => {
    let pathname = _pathname, data = _data, paths = _paths, headers = _headers, $api = _api
    if(typeof _pathname !== 'string'){
      pathname = _pathname.pathname
      data = _pathname.data
      paths = _pathname.paths
      headers = _pathname.headers
      $api = _pathname.api
    }
    const type = last(pathname.split('/'))
    request({
      pathname,
      data,
      paths,
      headers,
      api: $api || api,
    }).then((_result) => {
      const {data, call} = _result
      if(Array.isArray(call)){
        call.forEach((name) => {
          contextCall(data, type, name, context)
        })
      }else if(typeof call === 'string'){
        contextCall(data, type, call, context)
      }
    })
  }
}
