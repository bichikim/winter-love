// read a env file
const {join} = require('path')
// export config
module.exports = (path) => {
  const _path = path || 'environment.json'
  // eslint-disable-next-line global-require
  return require(join(process.cwd(), _path))
}
