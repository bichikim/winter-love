const winterLove = require('./render')
const express = require('express')
const consola = require('consola')
const PORT = 8080
const PRODUCTION = 'production'
// get setting
const port = process.env.PORT || PORT
const dev = process.env.NODE_ENV !== PRODUCTION
// create & set express app
const app = express()
// app.set('trust proxy', true)
app.set('port', true)

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
