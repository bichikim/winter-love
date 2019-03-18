/* tslint:disable:callable-types */
import {Vue} from 'vue/types/vue'
declare module 'vue/types/vue' {
  interface Vue {
  }

  interface VueConstructor{
  }
}

declare module 'vue/types/options' {
  // noinspection TsLint
  interface ComponentOptions<V extends Vue> {
    middleware?: string
    layout?: string
  }
}
