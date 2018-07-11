/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 */
declare module 'element-ui'
declare module 'lottie-web'

declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor()
  }

  export = WebpackWorker
}
