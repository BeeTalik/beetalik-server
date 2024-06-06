'use strict'

const packageData = require('../package.json')

module.exports = {
  info: {
    name: packageData.name,
    version: packageData.version,
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    logger: true,
  },
}
