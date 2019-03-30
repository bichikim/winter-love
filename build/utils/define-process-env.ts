import {chain} from 'lodash'
const upperSnakeCase = (value: string) => (
  chain(value).snakeCase().toUpper().valueOf()
)
export const defineProcessEnv = (name: string, data: any, prefix?: string | string[]) => {
  const names: string[] = []
  if(Array.isArray(prefix)){
    const prefixArray: string[] = prefix.reduce((result: string[], eachPrefix: string) => {
      result.push(upperSnakeCase(eachPrefix))
      return result
    }, [])
    names.push(...prefixArray)
  }else if(typeof prefix === 'string'){
    names.push(upperSnakeCase(prefix))
  }
  names.push(upperSnakeCase(name))
  return {[`process.env.${names.join('.')}`]: JSON.stringify(data)}
}
