import IPathInfo, {sParents} from './IPathInfo'

export interface IPathCollection {
  get(path?: string): IPathInfo

  add(pathInfo: IPathInfo[] | IPathInfo): void
  add(namespace: string, pathInfo: IPathInfo[] | IPathInfo): void

  remove(pathname: string | string[])
  remove(namespace: string, pathname: string | string[]): void
}

export default class PathCollection implements IPathCollection {
  private static _errorBadge: string = '[vuex-keg-request/PathCollection]'
  private static _addOne(pathInfo: IPathInfo, itemPathInfo: IPathInfo) {
    const {name} = itemPathInfo
    if(!name){
      throw new Error('[vuex-keg-request/PathCollection]' +
        `pathInfo has no name ${itemPathInfo}`,
      )
    }
    if(!pathInfo.module){
      pathInfo.module = {}
    }
    if(pathInfo.module[name]){
      if(process.env.NODE_ENV !== 'production'){
        console.warn(
          `${PathCollection._errorBadge} adding pathInfo is overriding previous one`,
        )
      }
    }
    pathInfo.module[name] = {...itemPathInfo, [sParents]: pathInfo}
  }
  private static _removeOne(pathInfo: IPathInfo, pathname: string) {
    if(!pathInfo.module || pathInfo.module[pathname]){
      if(process.env.NODE_ENV !== 'production'){
        console.warn(
          `${PathCollection._errorBadge} can not remove it because there has no ${pathname}`,
        )
      }
    }
  }
  private readonly _pathInfo: IPathInfo = {}

  constructor(pathInfo: IPathInfo = {}) {
    this._pathInfo = pathInfo
  }

  get(_path: string | string[]): IPathInfo {
    if(!Array.isArray(_path)){
      return this._getPathInfo(_path.split('/'))
    }
    return this._getPathInfo(_path)
  }

  add(
    _namespace: string | IPathInfo[] | IPathInfo,
    _pathInfo?: IPathInfo[] | IPathInfo,
  ): void {
    let namespace = _namespace, pathInfo = _pathInfo
    if(typeof _namespace !== 'string'){
      namespace = null
      pathInfo = _namespace
    }
    this._add(namespace as string, pathInfo)
  }

  remove(_namespace: string, _pathname?: string): void {
    let namespace = _namespace, pathname = _pathname
    if(!_pathname){
      namespace = null
      pathname = _namespace
    }
    this._remove(namespace, pathname)
  }

  private _getPathInfo(path?: string[]): IPathInfo {
    if(path){
      let hostInfo: any = {}
      let currentPathInfo = this._pathInfo
      let previousNamespace: string = 'root'
      path.forEach((key) => {
        if(!currentPathInfo.module || !currentPathInfo.module[key]){
          throw new Error(
            `${PathCollection._errorBadge} pathInfo has no namespace` +
            `${key} in ${previousNamespace}`,
          )
        }
        currentPathInfo = currentPathInfo.module[key]
        const {
          url = hostInfo.url,
          basePath = hostInfo.basePath,
          hostname = hostInfo.hostname,
          port = hostInfo.port,
          protocol = hostInfo.protocol,
        } = currentPathInfo
        hostInfo = {url, basePath, hostname, port, protocol}
      })
      return {...currentPathInfo, ...hostInfo}
    }
    return this._pathInfo
  }

  private _add(
    _namespace: string | string[] | null,
    _pathInfo: {[name: string]: IPathInfo} | IPathInfo | IPathInfo[]): void {
    const pathInfo: IPathInfo = this.get(_namespace)
    if(!pathInfo.module){
      pathInfo.module = {}
    }
    if(Array.isArray(_pathInfo)){
      _pathInfo.forEach((value) => {
        PathCollection._addOne(pathInfo, value)
      })
    }else if((_pathInfo as IPathInfo).path){
      PathCollection._addOne(pathInfo, _pathInfo)
    }
    if(typeof _pathInfo === 'object'){
      Object.keys(_pathInfo).forEach((key) => {
        PathCollection._addOne(pathInfo, {..._pathInfo[key], name: key})
      })
    }
    if(process.env.NODE_ENV !== 'production'){
      console.warn(`${PathCollection._errorBadge} add won't add anything`)
    }
  }

  private _remove(_namespace: string, _pathname?: string | string[]): void {
    const pathInfo: IPathInfo = this.get(_namespace)
    if(Array.isArray(_pathname)){
      _pathname.forEach((name) => {
        PathCollection._removeOne(pathInfo, name)
      })
      return
    }
    PathCollection._removeOne(pathInfo, _pathname)
  }
}
