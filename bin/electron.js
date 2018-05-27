/* eslint-disable global-require,no-magic-numbers */
const http = require('http')
const {Nuxt, Builder} = require('nuxt')
const {resolve} = require('path')
let config = require('../config/nuxt.config.js')
config.rootDir = resolve(__dirname, '../') // for electron-builder
config.dev = process.dev.NODE_ENV !== 'production'
// Init Nuxt.js
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)
// Build only in dev mode
if(config.dev){
  builder.build().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
// Listen the server
server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)

/*
 ** Electron
 */
let win = null // Current window
const electron = require('electron')
const {app, BrowserWindow} = electron
const newWin = () => {
  win = new BrowserWindow({
    icon: resolve(__dirname, '../' ,config.srcDir ,'static/icon.png'),
  })
  // win.maximize()
  win.on('closed', () => (win = null))
  if(config.dev){
    // Install vue dev tool and open chrome dev tools
    const {default: installExtension, VUEJS_DEVTOOLS} = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS.id).then((name) => {
      console.log(`Added Extension:  ${name}`)
      win.webContents.openDevTools()
    }).catch((err) => console.log('An error occurred: ', err))
    // Wait for nuxt to build
    const pollServer = () => {
      http.get(_NUXT_URL_, (res) => {
        if(res.statusCode === 200){
          win.loadURL(_NUXT_URL_)
        }else{setTimeout(pollServer, 300)}
      }).on('error', pollServer)
    }
    pollServer()
  }else{return win.loadURL(_NUXT_URL_)}
}
app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
