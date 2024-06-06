'use strict'

import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

import packageData from '../../package.json' assert { type: 'json' }
fastify.get('/', async function (request, reply) {
  reply.send(`Welcome to ${packageData.name} version ${packageData.version}`)
})

export default async function startApi() {
  try {
    await fastify.listen({ port: 3000 })
    console.log(`${packageData.name} version ${packageData.version} listening at 3000`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

