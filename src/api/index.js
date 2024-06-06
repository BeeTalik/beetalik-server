'use strict'

import Fastify from 'fastify'
import autoLoad from '@fastify/autoload'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export default async function startApi(config) {
  const fastify = Fastify({
    logger: config.logger
  })

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  fastify.register(autoLoad, {
    dir: join(__dirname, 'routes'),
  })

  try {
    await fastify.listen({
      host: config.host,
      port: config.port,
    })
    fastify.log.info(`${config.info.name} version ${config.info.version} listening at ${config.host}:${config.port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
