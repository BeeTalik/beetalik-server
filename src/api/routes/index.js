'use strict'

import config from 'config'

export default async function MainRoute(app) {
  app.get('/', async function (request, reply) {
    reply.send(`Welcome to ${config.info.name} version ${config.info.version}`)
  })
}
