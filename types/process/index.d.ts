/* tslint:disable:interface-name no-namespace */

declare namespace NodeJS {
  export interface Process {
    browser: boolean
    BROWSER_BUILD: boolean
    cache: any
    client: boolean
    mode: 'universal' | 'spa'
    modern: boolean
    server: boolean
    static: boolean
  }

  export interface ProcessEnv {
    PORT?: string
    readonly NUXT_TS: boolean
    readonly SSR?: string
  }
}
