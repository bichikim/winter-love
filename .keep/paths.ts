import fs from 'fs'
import {join} from 'path'
import {readConfigFile} from 'typescript'

function pathTrim(path: string) {
  return path.split('/').reduce((path: string[], value) => {
    if(value !== '*'){
      path.push(value)
    }
    return path
  }, []).join('/')
}

export function tsPathsToAlias(
  appRoot: string,
  tsconfig: string = 'tsconfig.json',
) {
  const tsconfigResult = readConfigFile(join(appRoot, tsconfig), (path: string) => {
    return fs.readFileSync(path).toString()
  })

  if(tsconfigResult.error){
    throw tsconfigResult.error
  }
  const {compilerOptions}  = tsconfigResult.config

  const paths: {[key: string]: string} = compilerOptions && compilerOptions.paths
  if(!paths){
    return  []
  }

  return Object.entries(paths).reduce<Record<string, string>>(
    (webpackPaths, [key, value]) => {
      if(value.length !== 1){
        console.warn('no supporting multi paths')
      }
      webpackPaths[pathTrim(key)] = join(appRoot, pathTrim(value[0]))
      return webpackPaths
    },
    {},
  )
}
