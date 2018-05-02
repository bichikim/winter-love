/**
 * @auther Bichi Kim <bichi@live.co.kr>
 */
import getBlobType from './get-blob-type'

describe('get-blob-type', function() {
  it('can get blob type', () => {
    const site = 'http://www.abc.com/gogo.go/'
    const png = getBlobType(`${site}abc.png`)
    expect(png).to.equal('image/png')
    const svg = getBlobType(`${site}abc.svg`)
    expect(svg).to.equal('image/svg')
    const gif = getBlobType(`${site}abc.gif`)
    expect(gif).to.equal('image/gif')
    const jpg = getBlobType(`${site}abc.jpg`)
    expect(jpg).to.equal('image/jpg')
    const nothing = getBlobType(`${site}abc...`)
    expect(nothing).to.equal('application/xml')
  })
})
