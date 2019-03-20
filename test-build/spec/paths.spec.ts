import {expect} from 'chai'
import {tsPathsToAlias} from '~~/build/paths'

describe('paths', function() {
  it('should create array paths for webpack alias', function() {
    tsPathsToAlias(process.cwd(), 'tsconfig.js')
    expect('a').to.equal('')
  })
})
