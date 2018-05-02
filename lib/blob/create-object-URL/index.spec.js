/**
 * @auther Bichi Kim <bichi@live.co.kr>
 */
import createObjectUrl from './index'
const kb = 1024

describe('create object url', function() {
  it('create object url', () => {
    const url = createObjectUrl(new Blob([new ArrayBuffer(kb)], {type: 'image/png'}))
    expect(url).to.include('blob:http://')
  })
})
