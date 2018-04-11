import vuexKeg from 'vuex-keg'

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
]
