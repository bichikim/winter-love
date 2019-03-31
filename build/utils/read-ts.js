const ts = require('typescript/lib/typescript')
const fs = require('fs')
const {resolve} = require('path')
const requireFromString = require('require-from-string')

// read typescript webpack config file by js
module.exports = (path) => {
  // compile typescript
  const myModule = ts.transpileModule(
    fs.readFileSync(resolve(path)).toString(), {
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
  const webpackBaseConfigModule = requireFromString(
    myModule.outputText,
    'webpack.base.config.js',
    {appendPaths},
    )

  // check ES module & return webpack base config
  if(
    typeof webpackBaseConfigModule === 'object'
    && webpackBaseConfigModule.__esModule
  ){
    return webpackBaseConfigModule.default || webpackBaseConfigModule
  }

  throw new Error('Error cannot read config')
}
