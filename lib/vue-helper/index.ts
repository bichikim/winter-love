export const shouldChange = (origin, compare) => {
  if(!origin || !compare){return true}
  const change = Object.keys(compare).find((key) => {
    return origin[key] !== compare[key]
  })
  return typeof change !== 'undefined'
}
