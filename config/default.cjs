'use strict'

const packageData = require('../package.json')
const { v4: uuidv4 } = require('uuid')

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
  cors: {
    origin: true, // Really permisive, restrict to your needs setting an array of allowed URLs
  },
  jwt: {
    challenge: {
      secret: uuidv4(),
      expiresIn: '60000',
    },
    login: {
      secret: uuidv4(),
      expiresIn: '1w',
    },
  },
}
