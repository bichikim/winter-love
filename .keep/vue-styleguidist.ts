import styleguidist from 'vue-styleguidist'
import argv from 'yargs'
import config from './styleguide.config'
const styleGuide = styleguidist(config)
const command = argv
  .command(
    ['server', '*'],
    'serve vue-styleguidist"',
    {},
    () => {
      styleGuide.server(
        (error, config) => {
          if(error){
            throw error
          }else{
            const url = `http://${config.serverHost}:${config.serverPort}`
            console.log(`Listening at ${url}`)
          }
        },
      )
    },
  )
  .command(
    'build',
    'build vue-styleguidist',
    {},
    () => {
    styleGuide.build((error, config) => {
      if(error){
        throw error
      }else{
        console.log('Style guide published to', config.styleguideDir)
      }
    })
  })
  .help()
  .argv
