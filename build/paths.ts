import fs from 'fs'
import {endsWith} from 'lodash'
import * as path from 'path'
import {readConfigFile} from 'typescript'

function fromTsAlias(tsAlias: string) {
  return endsWith(tsAlias, '/*')
    ? tsAlias.substring(0, tsAlias.length - 2)
    : `${tsAlias}$`
}

function fromTsPath(tsPath: string) {
  return endsWith(tsPath, '/*')
    ? tsPath.substring(0, tsPath.length - 2)
    : tsPath
}

export function tsPathsToAlias(
  appRoot: string,
  tsconfig: string,
) {
  const paths = readConfigFile('../tsconfig.json', (path: string) => {
    return fs.readFileSync(path).toString()
  })

  console.log(paths)

  // return Object.entries(paths).reduce<Record<string, string>>(
  //   (acc, [key, value]) => {
  //     if (value.length !== 1) {
  //       throw new TypeError(
  //         `Unsupported TS alias ${key} has length ${value.length}`,
  //       )
  //     }
  //     acc[fromTsAlias(key)] = path.join(appRoot, fromTsPath(value[0]))
  //     return acc
  //   },
  //   {},
  // )
}
