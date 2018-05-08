import friebase from 'firebase'

import 'firebase/firestore'

let isInit: boolean = false
const PRODUCTION = 'production'

interface IInitializeOptions {
  apiKey: string
  authDomain: string
  projectId: string
}

export default function fireBase(options: IInitializeOptions) {
  if(!isInit){
    friebase.initializeApp(options)
  }else if(process.env.NodeEnv !== PRODUCTION){
    console.warn('[vuex-keg-firebase] is already called')
  }

  const db = friebase.firestore()
  isInit = true

  return () => () => () => {
    return db
  }
}
