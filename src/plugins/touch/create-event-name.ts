import {kebabCase} from 'lodash'
import {defaultName} from './'

export const createEventName = (name: string, subName: string) => {
  let eventName = name
  if(subName !== defaultName){
    eventName = [eventName, kebabCase(subName)].join('-')
  }
  return eventName
}
