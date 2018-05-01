export default (blob: Blob): string => {
  return (window.URL || window.webkitURL).createObjectURL(blob)
}
