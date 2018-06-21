export function shouldChange(compare: any, _origin: any) {
  const origin = _origin || this
  if(!origin || !compare){return true}
  const change = Object.keys(compare).find((key) => {
    return origin[key] !== compare[key]
  })
  return typeof change !== 'undefined'
}

export function boolean(data: any): boolean {
  switch(data){
    case 'false':
      return false
    default:
      return Boolean(data)
  }
}
