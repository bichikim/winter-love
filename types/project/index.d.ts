/* tslint:disable:no-namespace */

declare namespace Project {
  import {VueFireObjectOptions} from '@/plugins/firebase'
  export interface ENVFirebase {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
  }

  export interface ENV {
    firebase: ENVFirebase
  }

  export interface Environment {
    typescript?: {
      bundleProject?: string,
    },
    path?: {
      middleware?: string,
      layouts?: string
      pages?: string,
      src?: string,
      plugins?: string,
    },
    styleguidist?: {
      script: string
      styleguideDir: string,
      components: string[],
      serverHost: string,
      require: string[],
    },
    firebase?: VueFireObjectOptions,
    env?: ENV,
  }
}
