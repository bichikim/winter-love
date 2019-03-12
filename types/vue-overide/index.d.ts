import Vue from 'vue'
declare module '*.vue' {
  const content: any
  export default content
}

declare module 'vue/types/vue' {
  interface Vue {
  }

  interface VueConstructor{
  }
}

declare module 'vue/types/options' {
  // noinspection TsLint
  interface ComponentOptions<V extends Vue> {
  }
}
