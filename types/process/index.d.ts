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
    NODE_ENV?: 'production' | 'development'
    /**
     * For src/register to run automatically
     */
    AUTO_REGISTER?: boolean | 'true'
  }
}
