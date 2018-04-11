import vuexKeg from 'vuex-keg'
import VueStorage from '~/vuex-storage'

export const state = () => ({

})

export const plugins =  [
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
  VueStorage({}),
]
