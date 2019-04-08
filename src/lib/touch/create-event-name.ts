import {kebabCase} from '@@/node_modules/@types/lodash'
import {defaultName} from '@/lib/touch/index'

export const createEventName = (name: string, subName: string) => {
  let eventName = name
  if(subName !== defaultName){
    eventName = [eventName, kebabCase(subName)].join('-')
  }
  return eventName
}
