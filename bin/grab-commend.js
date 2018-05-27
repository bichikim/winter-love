const minimist = require('minimist')
const SKIP = 2
const DEFAULT_PORT = 8080
module.exports = function grabCommend() {
  /**
   * argument vector
   * @type {argv}
   * @property b
   * @property build switch build before run server
   * @property p
   * @property port set port number
   */
  const argv = minimist(process.argv.slice(SKIP))
  return {
    build: Boolean(argv.b) || Boolean(argv.build),
    port: Number(argv.p) || Number(argv.port) ||  process.env.PORT || DEFAULT_PORT,
  }
}
