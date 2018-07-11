/* eslint-disable no-magic-numbers */
import utils from './utils'
describe('Project Utils', () => {
  const {getNuxtVersion} = utils
  describe('get Nuxt version', () => {
    it('can get nuxt current version', () => {
      expect(getNuxtVersion()).toEqual(2)
    })
  })
})
