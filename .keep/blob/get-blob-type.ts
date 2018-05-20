const image = (extension: string) => {
  return `image/${extension}`
}

const application = (extension: string) => {
  return `application/${extension}`
}

export default (url: string): string => {
  const pre: null | string[] = /^.+\.([^.]+)$/.exec(url)
  const extension: string = pre ? pre.pop() : ''
  switch(extension){
    case 'jpg':
      return image(extension)
    case 'png':
      return image(extension)
    case 'gif':
      return image(extension)
    case 'svg':
      return image(extension)
    default:
      return application('xml')
  }
}
