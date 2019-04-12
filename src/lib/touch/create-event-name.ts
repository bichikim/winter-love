import {defaultName} from '@/lib/touch/index'
import {kebabCase} from 'lodash'

export const createEventName = (name: string, subName: string) => {
  let eventName = name
  if(subName !== defaultName){
    eventName = [eventName, kebabCase(subName)].join('-')
  }
  return eventName
}
