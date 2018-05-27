const winterLove = require('./render')
const consola = require('consola')
// running logic
async function run() {
  const {mode, port, NODE_ENV} = process.env
  const render = await winterLove({
    build: false,
    config: {
      dev: false,
    },
  })
  if(mode === 'electron'){
      // eslint-disable-next-line global-require
    const electron = require('./electron')
    electron(render, NODE_ENV)
  }else{
    // eslint-disable-next-line global-require
    const web = require('./web')
    await web(render, port)
  }
}


run()
  .then(() => (consola.start('service is started')))
  .catch((error) => (consola.error(error)))
