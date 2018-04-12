const w: Worker= self as any
w.addEventListener('message', (event) => {
  const {data: {url}} = event
  const req = new XMLHttpRequest()
  req.responseType = 'blob'
  req.onprogress = (event) => {
    const {loaded, total} = event
    w.postMessage({
      status: 'progress',
      loaded,
      total,
    })
  }
  req.onload = (event) => {
    const {loaded, total} = event as any
    const {target: {response}} = event as any
    w.postMessage({
      status: 'done',
      loaded,
      total,
      response,
    })
    w.terminate()
  }
  req.open('GET', url, true)
  req.send()
})
