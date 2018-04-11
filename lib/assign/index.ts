import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

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
  const {safeMode = false} = options
  forEach(sources, (item: any, key: string) => {
    if(safeMode){
      const stateData = object[key]
      if(stateData || stateData === null || stateData === ''){
        runner(key, item, options, object, sources)
        return true
      }
      return true
    }
    runner(key, item, options, object, sources)
  })
  return object
}

const deepInfinitySave = (
  key: string,
  item: {},
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

export const assignInfinity = (object: {} = {}, sources: {} = {}, options: IAssignOptions = {}) => {
  forEachRun(object, sources, deepInfinitySave, options)
  return object
}
