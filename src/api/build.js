'use strict'

import Fastify from 'fastify'
import cors from '@fastify/cors'
import autoLoad from '@fastify/autoload'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export async function build(opts) {
  const fastify = Fastify(opts)

  await fastify.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

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

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  fastify.register(autoLoad, {
    dir: join(__dirname, 'routes'),
  })

  return fastify
}
