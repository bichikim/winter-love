import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

const INFINITY = -1

type TRunner = (
  key: string,
  item: any,
  options: IAssignOptions,
  object?: {},
  payload?: {},
) => void

interface IAssignOptions {
  safeMode?: boolean
  limit?: number
}

// sort of reducer
const forEachRun = (
  object: {} = {},
  sources: {} = {},
  runner: TRunner,
  options: IAssignOptions = {},
): {} => {
  const {safeMode = false, limit = INFINITY} = options
  if(limit !== 0){
    const _options = {safeMode, limit: limit - 1}
    forEach(sources, (item: any, key: string) => {
      if(safeMode){
        const stateData = object[key]
        if(stateData || stateData === null || stateData === ''){
          runner(key, item, _options, object, sources)
          return true
        }
        return true
      }
      runner(key, item, _options, object, sources)
    })
    return
  }

  return object
}

const deepInfinitySave = (
  key: string,
  item,
  options: IAssignOptions = {},
  object: {} = {},
) => {
  const objectItem = object[key]
  if(
    (isObject(item) && isObject(objectItem)) ||
    (isArray(item) && isArray(objectItem))
  ){
    assignInfinity(objectItem, item, options)
    return
  }
  object[key] = item
}

const assignInfinity = (object: {} = {}, sources: {} = {}, options: IAssignOptions = {}) => {
  forEachRun(object, sources, deepInfinitySave, options)
  return object
}

export default assignInfinity
