export const sParents = Symbol('pathInfo parent')
export default interface IPathInfo {
  name?: string
  module?: {[name: string]: IPathInfo}
  method?: string
  basePath?: string
  path?: string | string[] | ((path: {[name: string]: string}) => string)
  inject?: { // auto inject
    data?: {[name: string]: any},
    headers?: {[name: string]: any},
  }
  autoSuccess?: string | string[]
  autoError?: string | string[]
  request?: (data: any) => any
  result?: (data: any) => any
  error?: (data: any) => any
  url?: string
  hostname?: string,
  port?: number | string,
  protocol?: string,
  [sParents]?: IPathInfo
}
