import readEnvironment from '@@/build/utils/read-environment.js'
import {expect} from 'chai'
const envPath = 'test-build/mock/environment.json'

describe('read-environment', function test() {
  it('should readEnvironment', function test() {
    expect(readEnvironment).to.be.a('function')
    const environment = readEnvironment(envPath)
    expect(environment.styleguidist).to.deep.equal({
      'script': '',
      'styleguideDir': '.styleguidist',
      'components': ['./src/components/**/*.vue'],
      'serverHost': 'localhost',
      'require': ['./build/styleguidist.register.ts'],
    })
    expect(environment.typescript).to.deep.equal({
      'bundleProject': 'tsconfig.bundle.json',
      'nodeProject': 'tsconfig.node.json',
    })
    expect(environment.path).to.deep.equal({
      'middleware': 'middleware',
      'layouts': 'layouts',
      'pages': 'pages',
      'src': 'src',
    })
    expect(environment.firebase).to.deep.equal({
      'apiKey': 'AIzaSyCzNb_FV1ySi_4Hms9MsucvMcuELGVUnBI',
      'authDomain': 'winter-lover.firebaseapp.com',
      'databaseURL': 'https://winter-lover.firebaseio.com',
      'projectId': 'winter-lover',
      'storageBucket': 'winter-lover.appspot.com',
      'messagingSenderId': '353016949858',
    })
    expect(environment.env).to.be.an('object')
  })
})
