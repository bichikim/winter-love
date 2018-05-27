const winterLove = require('./middleware')
const consola = require('consola')
// running logic
async function run() {
  const render = await winterLove({
    build: false,
    config: {
      dev: false,
    },
  })
  if(process.env.mode === 'electron'){
      // eslint-disable-next-line global-require
    const electron = require('./electron')
    electron(render)
  }else{
    // eslint-disable-next-line global-require
    const web = require('./web')
    await web(render)
  }
}


run()
  .then(() => (consola.start('service is started')))
  .catch((error) => (consola.error(error)))
