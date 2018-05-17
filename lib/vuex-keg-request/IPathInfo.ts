export const sParents = Symbol('pathInfo parent')
export default interface IPathInfo {
  name?: string
  module?: {[name: string]: IPathInfo}
  method?: string
  basePath?: string
  apiKey: string, // Todo: 파이어 베이스 키 ID 미구현
  authDomain: string, // Todo: 파이어 베이스 도메인 미구현
  projectId: string, // Todo: 파이어 스토어 ID 미구현
  mode?: string // Todo: 어떤 요청으로 보낼지 설정 fireStore restful 기본값 restful
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
