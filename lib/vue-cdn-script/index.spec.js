import vueCdnScript, {findAttribute, getAllScript} from './'
import {createLocalVue, mount} from '@vue/test-utils'
describe('vue-cdn-script', () => {
  it('can load src', () => {
    const localVue = createLocalVue()
    const src = [
        'https://apis.google.com/js/client:platform.js',
        '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      ]
    localVue.use(vueCdnScript, {
      src,
    })
    // const wrapper = mount(Test, {
    //   localVue,
    // })
    expect(Boolean(findAttribute(getAllScript(), 'src', src[0]))).to.equal(true)
    expect(Boolean(findAttribute(getAllScript(), 'src', src[1]))).to.equal(true)
  })
})

