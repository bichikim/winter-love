import vuexKeg from 'vuex-keg'
import {Store} from 'vuex'
import VuexKegRequest from '~/vuex-keg-request'
import VuexStorage from '~/vuex-storage'
import IApi from './api'

export interface IRootState {
  // have nothing
}

export interface IState extends IRootState{
  api: IApi
}

export interface IStore extends Store<IState> {
  // empty Interface
}

export type TRootSateFunction = () => IRootState
export const state: TRootSateFunction = () => ({})

export const plugins = [
  vuexKeg({
    plugins: {
      test: () => {
        return () => {
          return () => {
            console.log('run~ testing')
          }
        }
      },
      request: VuexKegRequest({
        pathInfo: {
          url: 'https://google.com',
          module:{
            test: {
              path: 'test',
            },
          },
        },
      }),
    },
  }),
  VuexStorage({
    session: {
      except: [],
    },
  }),
]
