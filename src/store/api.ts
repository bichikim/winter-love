/**
 * @description Api 통신에 필요한 정보들
 */

import {keg} from 'vuex-keg'

export interface IApiState {
  test?: any
  noNo?: any
}

export const state = (): IApiState => ({
  test: null,
  noNo: null,
})

export const actions = {
  ...keg({
    // this test keg
    test: ({request}) => {
      request('test')
    },
  }),
}

export const mutations = {
  changeTest(state: IApiState, payload: any) {
    state.test = payload
  },
  changeNoNo(state: IApiState, payload: any) {
    state.noNo = payload
  },
}

export const getters = {
  getTest: (state: IApiState) => (count: number) => {
    return `${state.test}~${count}`
  },
}
