'use strict'

import config from 'config'

import Fastify from 'fastify'
import cors from '@fastify/cors'
import autoLoad from '@fastify/autoload'
import auth from '@fastify/auth'

import { registerBearerToken } from './hooks/bearerToken.js'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export async function build(opts) {
  const fastify = Fastify(opts)

  await fastify.register(cors, {
    origin: config.cors.origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  await fastify.register(auth)

  if (process.env.NODE_ENV === 'development') {
    await fastify.register(await import('fastify-overview'), {
      exposeRoute: true,
    })
    await fastify.register(await import('fastify-overview-ui'))
    fastify.addHook('onReady', () => {
      fastify.overview()
    })
    fastify.addHook('onRequest', (req, reply, done) => {
      req.devMode = true
      req.overviewRoutes = ['json-overview', 'fastify-overview-ui/']
      done()
    })
  }

  // Extract Authenticate Bearer Token from header and store in token
  //  do it before parsing body
  fastify.addHook('onRequest', registerBearerToken(fastify))

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  fastify.register(autoLoad, {
    dir: join(__dirname, 'routes'),
  })

  return fastify
}
