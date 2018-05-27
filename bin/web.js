const express = require('express')
const server = express()
const PORT = 8080

module.exports = async function(render, port = PORT) {
  server.set('trust proxy', true)
  server.use(render)
  try{
    await new Promise((resolve) => {server.listen(port, resolve)})
  }catch(error){
    throw error
  }
}
