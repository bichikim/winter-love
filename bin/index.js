const winterLove = require('./render')
const express = require('express')
const consola = require('consola')
const PORT = 8080
// create & set express app
const app = express()
app.set('trust proxy', true)

// get setting
const {build = false, port = PORT} = process.env
const dev = process.env.NODE_ENV !== 'production'

// running logic
async function run() {
  const winterLoveMiddleware =  await winterLove({
    build,
    config: {
      dev,
    },
  })
  app.use(winterLoveMiddleware)
  await new Promise((resolve) => {app.listen(port, resolve)})
}

// run!
run()
  .then(() => (consola.start(`service is started port: ${port}`)))
  .catch((error) => (consola.error(error)))
