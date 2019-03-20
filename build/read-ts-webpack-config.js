const ts = require('typescript')
const fs = require('fs')
const {join} = require('path')
const requireFromString = require('require-from-string')

module.exports = () => {
  const myModule = ts.transpileModule(
    fs.readFileSync(join(__dirname, './webpack.base.config.ts')).toString(), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2015,
        esModuleInterop: true,
      },
    })

  const appendPaths = [
    ...module.paths,
  ]

  const webpackBaseConfigModule = requireFromString(myModule.outputText, 'webpack.base.config.js', {
    appendPaths,
  })

  if(
    typeof webpackBaseConfigModule === 'object'
    && webpackBaseConfigModule.__esModule
  ){
    return webpackBaseConfigModule.default || webpackBaseConfigModule
  }

  throw new Error('error cannot read config')
}


