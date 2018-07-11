import vuexKeg from 'vuex-keg'
import VuexStorage from 'vuex-storage'

export const state = () => ({
})

export const plugins = [
  // vuex 엑션 확장 플러그인
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
  // 웹브라우저 저장소에 스토어 요소를 저장 할 수 있는 플러그인
  VuexStorage({
    session: {
      except: [],
    },
  }),
]
