/* eslint-disable max-nested-callbacks */
import load from './load'
import images from './testImages.json'
describe('load', () => {
  it('can load', () => {
    images.images.forEach((url) => {
      load(url, () => {
        console.log('workign?')
      })
    })
  })
})

