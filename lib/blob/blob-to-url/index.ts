export default (blob) => {
  const url = window.URL || window.webkitURL
  return url.createObjectURL(blob)
}
