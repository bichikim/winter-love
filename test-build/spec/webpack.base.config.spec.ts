import webpackBaseConfig from '@@/build/webpack.base.config'
import {expect} from 'chai'
import MemoryFS from 'memory-fs'
import {join, resolve} from 'path'
import webpack, {Configuration, Stats} from 'webpack'

const mockPath = resolve('test-build', 'mock')

describe('webpack base config', function test() {
  it('should read config', function test(done) {
    process.env.NODE_PROJECT = resolve('tsconfig.json')
    const fs = new MemoryFS()
    const outputPath = resolve(mockPath, 'dist')
    const outputFileName = 'bundle.js'
    this.timeout(40000)
    expect(webpackBaseConfig).to.be.a('function')
    const config: Configuration = webpackBaseConfig({}, {
      typescript: {
        bundleProject: resolve('tsconfig.json'),
      },
    })
    config.mode = 'production'
    config.entry = './test-build/mock/index.js'
    config.output = {
      path: outputPath,
      libraryTarget: 'umd',
      publicPath: '/',
      filename: outputFileName,
    }
    const compiler = webpack(config)
    compiler.outputFileSystem = fs
    compiler.run((error: Error, stats: Stats) => {
      expect(error).to.equal(null)
      const file = fs.readFileSync(join(outputPath, outputFileName))
        .toString()
      expect(file).to.be.a('string')
      done()
    })
  })
})
