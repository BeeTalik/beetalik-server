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
  jwt: {
    challenge: {
      secret: '50094535-171d-4099-a817-8ad13d250a3a',
      expiresIn: '60000',
    },
    login: {
      secret: '0eb9756b-2690-4c82-aba7-a5dc786a8a1a',
      expiresIn: '1w',
    },
  },
}
