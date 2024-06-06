'use strict'

import Fastify from 'fastify'

export default async function startApi(config) {
  const fastify = Fastify({
    logger: config.logger
  })

  fastify.get('/', async function (request, reply) {
    reply.send(`Welcome to ${config.info.name} version ${config.info.version}`)
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

