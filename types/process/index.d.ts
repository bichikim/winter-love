/* tslint:disable:interface-name no-namespace */

declare namespace NodeJS {
  export interface Process {
  }

  export interface ProcessEnv {
    readonly PORT?: string

    /**
     * a path to router layout folder
     * @default 'layouts'
     */
    readonly LAYOUTS_PATH?: string

    /**
     * middleware folder name
     * @default 'middleware'
     * @see ./src/utils/middleware
     */
    readonly MIDDLEWARE_PATH?: string

    /**
     * running mode
     * @default 'production'
     * @see ./build/webpack.base.js
     */
    readonly NODE_ENV?: 'production' | 'development'

    /**
     * router mode
     * @default 'history'
     * @see ./src/router.ts
     */
    readonly ROUTER_MODE?: 'history'

    /**
     * webpack alias for the src
     * @default '@'
     * @see ./build/webpack.base.config.js
     */
    readonly SRC_ALIAS?: string

  }
}
