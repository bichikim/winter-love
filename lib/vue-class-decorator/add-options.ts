const sOptions = Symbol('decorators-options')
export default (target: any, key: string, options: any) => {
  if(!target[sOptions]){
    target[sOptions] = []
  }
  target[sOptions].push({key, options})
}
