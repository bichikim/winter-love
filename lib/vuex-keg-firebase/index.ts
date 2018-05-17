import firebase from 'firebase'
import {isFunction} from 'lodash'

import 'firebase/firestore'

interface IInitializeOptions {
  apiKey: string | ((store: any) => string)
  authDomain: string | ((store: any) => string)
  projectId: string | ((store: any) => string)
}

export default function fireBase(options: IInitializeOptions) {
  const _options = {...options}

  return (store: any) => {

    Object.keys(_options).forEach((value, key) => {
      if(isFunction(value)){
        _options[key] = value(store)
      }
    })
    firebase.initializeApp(_options)
    const db = firebase.firestore()
    return () => (path: string) => {
      if(path){
        return db.doc(path)
      }
      return db
    }
  }
}
