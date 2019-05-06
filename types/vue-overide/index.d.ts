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
  // noinspection TsLint
  interface ComponentOptions<V extends Vue> {
    middleware?: string
    layout?: string
    firebase?: any
    env?: Project.ENV
    axios?: AxiosInstance
  }
}
