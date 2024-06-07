'use strict'

import fastify from './fastify.js'
import routes from './routes/index.js'

export default () => {
  describe('Fastify Framework Tests', fastify)
  describe('Routes Tests', routes)
}
