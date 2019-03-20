const ts = require('typescript')
const fs = require('fs')
const {join} = require('path')
const requireFromString = require('require-from-string')

module.exports = () => {
  // compile typescript
  const myModule = ts.transpileModule(
    fs.readFileSync(join(__dirname, './webpack.base.config.ts')).toString(), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2015,
        esModuleInterop: true,
      },
    })

  // getting module paths
  const appendPaths = [
    ...module.paths,
  ]

  // load module from compiled js code
  const webpackBaseConfigModule = requireFromString(myModule.outputText, 'webpack.base.config.js', {
    appendPaths,
  })

  // check ES module & return webpack base config
  if(
    typeof webpackBaseConfigModule === 'object'
    && webpackBaseConfigModule.__esModule
  ){
    return webpackBaseConfigModule.default || webpackBaseConfigModule
  }

  throw new Error('error cannot read config')
}


