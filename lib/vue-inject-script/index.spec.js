import vueInjectScript, {findAttribute, getAllScript} from './'
import {createLocalVue} from '@vue/test-utils'
describe('vue-cdn-script', () => {
  it('can load src', () => {
    const localVue = createLocalVue()
    const src = [
        'https://apis.google.com/js/client:platform.js',
        '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      ]
    localVue.use(vueInjectScript, {
      src,
    })
    // const wrapper = mount(Test, {
    //   localVue,
    // })
    expect(Boolean(findAttribute('src', src[0], getAllScript()))).to.equal(true)
    expect(Boolean(findAttribute('src', src[1], getAllScript()))).to.equal(true)
  })
})

