import LoadWorker from 'worker-loader!./load.worker'

export default (url, callback) => {
  const worker = new LoadWorker()
  worker.addEventListener('message', (event) => {
    if(callback){
      callback(event.data)
    }
  })
}
