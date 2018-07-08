import vuexKeg from 'vuex-keg'
import VuexStorage from 'vuex-storage'

export const state = () => ({
})

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
    },
  }),
  VuexStorage({
    session: {
      except: [],
    },
  }),
]
