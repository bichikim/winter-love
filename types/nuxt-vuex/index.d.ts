/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import {Store} from 'vuex'

export declare class NuxtStore<S> extends Store<S> {
  app: {
    context: {
      env: {[name: string]: any},
    },
  }
}
