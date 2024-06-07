'use strict'

import { describe } from 'node:test'
import fastify from './fastify.js'
import cors from './cors.js'
import routes from './routes/index.js'

export default () => {
  describe('Fastify Framework Tests', fastify)
  describe('Cors Tests', cors)
  describe('Routes Tests', routes)
}
