import vuexKeg from 'vuex-keg'
import VuexKegRequest from '~/vuex-keg-request'
import VuexStorage from '~/vuex-storage'

export const state = () => ({})

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
