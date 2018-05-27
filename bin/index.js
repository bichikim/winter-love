const winterLove = require('./middleware')
const express = require('express')
const consola = require('consola')
const grabCommend = require('./grab-commend')

// create & set express app
const app = express()
app.set('trust proxy', true)

// get setting
const {build = false, port} = grabCommend()

// running logic
async function run() {
  const winterLoveMiddleware =  await winterLove({
    build,
    config: {
      dev: false,
    },
  })
  app.use(winterLoveMiddleware)
  await new Promise((resolve) => {app.listen(port, resolve)})
}

// run!
run()
  .then(() => (consola.start(`service is started port: ${port}`)))
  .catch((error) => (consola.error(error)))
