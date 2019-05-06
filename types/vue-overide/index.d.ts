/* tslint:disable:callable-types */
import {AxiosInstance} from 'axios'
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $env: Project.ENV
    $axios: AxiosInstance
  }
}

declare module 'vue/types/options' {

  interface ComponentOptions<V extends Vue> {
    middleware?: string
    layout?: string
    fireBase?: firestore.App
    fireStore?: firestore.Firestore
    fireAuth?: firestore.auth
    env?: Project.ENV
    axios?: AxiosInstance
  }
}
