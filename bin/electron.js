const {app, BrowserWindow} = require('electron')
const http = require('http')
const OK = 200, POLL_WAIT_TIME = 300
let win
module.exports = (render, mode) => {
  const server = http.createServer(render)
  server.listen()
  const url = `http:localhost:${server.address().port}`
  console.log(`Nuxt working on ${url}`)

  const newWin = () => {
    win = new BrowserWindow({
      // icon: path.join(__dirname, //)
    })
    win.maximize()
    win.on('closed', () => (win = null))
    if(mode === 'development'){
      // eslint-disable-next-line global-require
      const {default: installExtension, VUEJS_DEVTOOLS} = require('electron-devtools-installer')
      installExtension((VUEJS_DEVTOOLS.id)).then((name) => {
        console.log(`Added Extension: ${name}`)
        win.webContents.openDevTools()
      }).catch((error) => (console.log('An error occurred: ', error)))
      const pollServer = () => {
        http.get(url, (res) => {
          if(res.statusCode === OK){
            win.loadURL(url)
          }else{
            setTimeout(pollServer, POLL_WAIT_TIME)
          }
        }).on('error', pollServer)
      }
      pollServer()
    }
    win.loadURL(url)
  }
  app.on('ready', newWin)
  app.on('window-all-closed', () => (app.quit()))
  app.on('activate', () => !win && newWin())
}

