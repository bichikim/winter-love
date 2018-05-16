export default (target: any) => {
  return Object.getPrototypeOf(target.prototype)
}
