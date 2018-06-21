import imageRequest from './image-request'

const w: Worker = self as any
const works: any[] = []
const INIT_DELAY = 0
const callback = (data, id, delay = INIT_DELAY) => {
  w.postMessage({...data, id})
  setTimeout(() => {
    get()
  }, delay)
}
const get = () => {
  if(works.length < 1){
    return
  }
  const {url, id} = works.shift()

  imageRequest({
    url,
    progress: (data) => (callback({...data, status: 'progress'}, id)),
    done: (data) => (callback({...data, status: 'done'}, id)),
  })
}
w.addEventListener('message', (event) => {
  const {data: {url, id}} = event
  works.push({url, id})
  get()
})
