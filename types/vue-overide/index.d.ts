/* tslint:disable:callable-types */
declare module 'vue/types/vue' {
  interface Vue {
  }

  interface VueConstructor{
  }
}

declare module 'vue/types/options' {
  import {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
    PropsDefinition,
  } from '@@/node_modules/vue/types/options'
  import Vue from 'vue'
  // noinspection TsLint
  export interface ComponentOptions<
    V extends Vue,
    Data=DefaultData<V>,
    Methods=DefaultMethods<V>,
    Computed=DefaultComputed,
    PropsDef=PropsDefinition<DefaultProps>,
    Props=DefaultProps> {
    middleware?: string
  }
}
