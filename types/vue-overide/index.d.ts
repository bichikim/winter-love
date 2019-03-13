declare module '*.vue' {
  import {VueConstructor} from 'vue'
  const vue: VueConstructor
  export default vue
}

declare module 'vue/types/vue' {
  interface Vue {
  }

  interface VueConstructor{
  }
}

declare module 'vue/types/options' {
  import Vue from 'vue'
  // noinspection TsLint
  interface ComponentOptions<V extends Vue> {
  }
}
