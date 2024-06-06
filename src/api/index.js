'use strict'

import { build } from './build.js'

export default async function startApi(config) {
  const fastifyOpts = {
    logger: config.logger
  }

  let fastify = await build(fastifyOpts)

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
