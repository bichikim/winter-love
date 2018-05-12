export const state = () => ({
  test: null,
  noNo: null,
})

export const actions = {}

export const mutations = {
  changeTest(state, payload) {
    state.test = payload
  },
  changeNoNo(state, payload) {
    state.noNo = payload
  },
}

export const getters = {
  getTest: (state) => (count) => {
    return `${state.test}~${count}`
  },
}
