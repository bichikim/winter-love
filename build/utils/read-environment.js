// read a env file
const path = require('path')
const environment = require(path.join(process.cwd(), 'environment.json'))
// export config
module.exports = environment
