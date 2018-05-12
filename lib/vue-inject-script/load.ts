import findAttribute from './find-attribute'
import getAllScript from './get-all-script'
import appendElement from './append-element'

export default function load(src: string, type: string = 'text/javascript'): Promise<string> {
  if(findAttribute('script', src, getAllScript())){
    return Promise.resolve(src)
  }
  const script = document.createElement('script')
  script.type = type
  script.src = src
  appendElement(script)
  return new Promise<string>((resolve, reject) => {
    script.onload = () => {
      resolve(src)
    }
    script.onerror = (error) => {
      reject(error)
    }
  })
}
