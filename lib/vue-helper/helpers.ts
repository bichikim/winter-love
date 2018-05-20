export function shouldChange(compare, _origin) {
  const origin = _origin || this
  if(!origin || !compare){return true}
  const change = Object.keys(compare).find((key) => {
    return origin[key] !== compare[key]
  })
  return typeof change !== 'undefined'
}

export function boolean(data) {
  switch(data){
    case 'false':
      return false
    default:
      return Boolean(data)
  }
}
