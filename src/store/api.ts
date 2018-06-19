import {keg} from 'vuex-keg'

export default interface IApi {
  test: string
}

export const state: () => IApi = () => ({
  test: null,
})

export const actions = {
  test: keg(({request}) => {
    request('test')
  }),
}

export const mutations: {[name: string]: (state: IApi, payload: any) => void} = {
  changeTest(state: IApi, payload: any) {
    state.test = payload
  },
}

export const getters: any = {
  getTest: (state: IApi) => (count: number) => {
    return `${state.test}~${count}`
  },
}
